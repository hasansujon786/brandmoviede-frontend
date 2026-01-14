import { baseApi } from "@/redux/api/baseApi";
import type { IAuthUser, WithStatus } from "@/types";

const webhookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IAuthUser, void>({
      query: () => `/auth/me`,
      providesTags: ["Auth"] as const,
      transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery } = webhookApi;
export default webhookApi;
