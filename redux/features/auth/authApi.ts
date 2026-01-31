import { baseApi } from "@/redux/api/baseApi";
import type {
  IAuthRegisterParams,
  IAuthRegisterResponse,
  IAuthUser,
  IAuthVerifyEmailParams,
  WithStatus,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IAuthUser, void>({
      query: () => `/auth/me`,
      providesTags: ["Auth"] as const,
      transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
    registerUser: builder.mutation<IAuthRegisterResponse, IAuthRegisterParams>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<
      IAuthRegisterResponse,
      IAuthVerifyEmailParams
    >({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useRegisterUserMutation,
  useVerifyEmailMutation,
} = authApi;
export default authApi;
