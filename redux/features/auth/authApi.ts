import { baseApi } from "@/redux/api/baseApi";
import type {
  IAuthChangePasswordParams,
  IAuthRegisterParams,
  IAuthRegisterResponse,
  IAuthUpdateUserParams,
  IAuthUser,
  IAuthVerifyEmailParams,
  WithStatus,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    getMe: builder.query<IAuthUser, void>({
      query: () => `/auth/me`,
      providesTags: ["Me"] as const,
      transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
    changePassword: builder.mutation<
      WithStatus<void>,
      IAuthChangePasswordParams
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
    updateAuthUser: builder.mutation<
      IAuthRegisterResponse,
      IAuthUpdateUserParams
    >({
      query: (body) => {
        const formData = new FormData();

        if (body.name) {
          formData.append("name", body.name);
        }

        if (body.avatar) {
          formData.append("avatar", body.avatar);
        }

        return {
          url: "/auth/update",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Me"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useUpdateAuthUserMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;
