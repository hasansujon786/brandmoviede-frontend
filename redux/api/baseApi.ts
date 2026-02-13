import constants from "@/constant";
import { ILoginParams, ILoginPayload, IRefreshTokenPayload } from "@/types";
import Cookies from "js-cookie";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
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

type RefreshResult = QueryReturnValue<
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>;

let refreshPromise: Promise<RefreshResult> | null = null;
let isRefreshing = false;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const state = api.getState() as RootState;

    // Only attempt refresh if user was logged in
    if (state.auth.token) {
      try {
        if (!isRefreshing) {
          isRefreshing = true;

          const state = api.getState() as RootState;
          const refreshToken = state.auth.refreshToken;

          const newToken = Cookies.get("token");

          refreshPromise = Promise.resolve(
            baseQuery(
              {
                url: "/auth/refresh-token",
                method: "POST",
                body: {
                  refresh_token: refreshToken,
                },
              },
              // {
              //   ...api,
              //   getState: () => ({
              //     ...api.getState(),
              //     auth: {
              //       ...state.auth,
              //       token: newToken, // override token here
              //     },
              //   }),
              // },
              api,
              extraOptions,
            ),
          );

          const refreshResult = await refreshPromise;

          if (refreshResult?.data) {
            const newToken = (refreshResult.data as IRefreshTokenPayload)
              ?.authorization?.access_token;

            api.dispatch(
              setCredentials({
                token: newToken,
                role: state.auth.role,
              }),
            );
          } else {
            throw new Error("Refresh failed");
          }

          isRefreshing = false;
        } else {
          await refreshPromise;
        }

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        isRefreshing = false;
        api.dispatch(logOut());
        toast.error("Session expired — please log in again.", {
          description: getErrorMessage(error),
        });
      }
    }
  }

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
    "RecentOrder",
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
          const refreshToken = data?.authorization?.refresh_token;
          const role = data?.type;

          dispatch(setCredentials({ token, role, refreshToken }));
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
