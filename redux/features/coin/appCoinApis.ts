import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type { IAuthUser, IPaginationParams, WithStatus } from "@/types";

const appCoinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoinBundles: builder.query<IAuthUser, IPaginationParams | void>({
      query: (params) =>
        `/coin/all${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["Coin"] as const,
      transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCoinBundlesQuery } = appCoinApis;
export default appCoinApis;
