import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type {
  IAppCoinBundle,
  IAppCoinCartCheckoutDraftList,
  IAppCoinCheckoutParams,
  IPaginationParams,
  WithPaginationAndStatus,
  WithStatus,
} from "@/types";

export interface IAppCoinCheckoutOrderParams {
  sugoId: string;
  items: {
    bundle_id: string;
    quantity: number;
  }[];
}

export interface IAppCoinCheckoutOrderResponse {
  client_secret: string;
  transaction_id: string;
  orders: string[];
}

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
    getAllCoinCheckoutDraft: builder.query<
      IAppCoinCartCheckoutDraftList[],
      void
    >({
      query: () => `/coin/checkout`,
      providesTags: ["CoinCheckoutDraft"] as const,
      transformResponse: (
        response: WithStatus<IAppCoinCartCheckoutDraftList[]>,
      ) => response.data,
    }),
    createCoinCheckoutDraft: builder.mutation<unknown, IAppCoinCheckoutParams>({
      invalidatesTags: ["CoinCheckoutDraft"] as const, // update all coins query
      query: (body) => ({
        url: "/coin/checkout",
        method: "POST",
        body,
      }),
    }),
    deleteCheckoutDraftItemById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/coin/checkout/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CoinCheckoutDraft"] as const,
    }),
    createCoinCheckoutOrder: builder.mutation<
      IAppCoinCheckoutOrderResponse,
      IAppCoinCheckoutOrderParams
    >({
      query: ({ sugoId, items }) => {
        return {
          url: "/coin/checkout/order",
          method: "POST",
          body: { sugo_id: sugoId, items: items },
        };
      },
      transformResponse: (
        response: WithStatus<IAppCoinCheckoutOrderResponse>,
      ) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCoinBundlesQuery,
  useGetSingleCoinBundleByIdQuery,
  useGetAllCoinCheckoutDraftQuery,
  useCreateCoinCheckoutDraftMutation,
  useDeleteCheckoutDraftItemByIdMutation,
  useCreateCoinCheckoutOrderMutation,
} = appCoinApis;
export default appCoinApis;
