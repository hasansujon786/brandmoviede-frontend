import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type {
  IAppCoinBundle,
  IAppCustomCoinBundle,
  IPaginationParams,
  WithPaginationAndStatus,
  WithStatus,
} from "@/types";

const appCoinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoinBundles: builder.query<
      WithPaginationAndStatus<IAppCoinBundle[]>,
      IPaginationParams | void
    >({
      query: (params) =>
        `/coin/all${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["Coin"] as const,
    }),
    getSingleCoinBundleById: builder.query<IAppCoinBundle, string>({
      query: (id) => `/coin/bundle/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Coin", id }],
      transformResponse: (response: WithStatus<IAppCoinBundle>) =>
        response.data,
    }),
    getCustomCoinBundle: builder.query<IAppCustomCoinBundle, void>({
      query: () => `/coin/custom`,
      providesTags: ["CustomBundle"],
      transformResponse: (response: WithStatus<IAppCoinBundle>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCoinBundlesQuery,
  useGetSingleCoinBundleByIdQuery,
  useGetCustomCoinBundleQuery,
} = appCoinApis;
export default appCoinApis;
