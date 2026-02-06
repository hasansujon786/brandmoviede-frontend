import constants from "@/constant";
import { ILoginParams, ILoginPayload } from "@/types";
import Cookies from "js-cookie";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.baseApiURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Setting header on every API call
    const state = getState() as RootState;
    const token = state.auth.token;
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
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const token = Cookies.get("token");
    if (token) {
      toast.error("Session expired — please log in again to continue.");
    }
    api.dispatch(logOut());
  }

  // if (result?.error?.originalStatus === 403 || result?.error?.status === 403) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery("/refresh", api, extraOptions);
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     const state = api.getState() as RootState;
  //     // const token = state.auth.token;
  //     // const role = state.auth.role;
  //     // store the new token
  //     // api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //     // retry the original query with new access token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Me",
    "Auth",
    "Coin",
    "Ticket",
    "Order",
    "MyTicketOrder",
    "Dashboard",
    "Notifications",
    "CoinCheckoutDraft",
    "AppNotification",
  ] as const,
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
          toast.error(
            getErrorMessage(error, "Login failed. Please try again."),
          );
        }
      },
    }),
  }),
});

export const { useLoginMutation } = baseApi;
