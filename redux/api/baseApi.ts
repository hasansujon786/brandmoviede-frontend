import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../features/auth/authSlice";
import constants from "@/constant";
import { ILoginPayload, ILoginParams } from "@/types/user/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.baseApiUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Setting header on every API call
    const token = getState()?.auth?.token;
    // const token = (getState() as { auth: AuthState }).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403 || result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Coin", "Ticket", "Dashboard"] as const,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginPayload, ILoginParams>({
      query: (credentialParams) => ({
        url: "/auth/login",
        method: "POST",
        body: credentialParams,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const token = data?.authorization?.access_token;
          const role = data?.type;

          dispatch(setCredentials({ token, role }));
        } catch (error) {
          console.error("Login mutation error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = baseApi;
