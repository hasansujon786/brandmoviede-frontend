import { baseApi } from "@/redux/api/baseApi";
import type { IAuthUser, WithStatus } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IAuthUser, void>({
      query: () => `/auth/me`,
      providesTags: ["Auth"] as const,
      transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery } = authApi;
export default authApi;
