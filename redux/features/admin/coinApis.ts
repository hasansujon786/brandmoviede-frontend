import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import {
  IAdminCoinBundle,
  IAdminCoinBundleDataPayload,
  IAdminCoinStats,
  ICreateCoinParams,
  IPaginationParams,
  IUpdateCoinParams,
  WithStatus,
} from "@/types";

const coinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetCoinStats: builder.query<IAdminCoinStats, void>({
      query: () => `/admin/coin/stats`,
      transformResponse: (response: WithStatus<IAdminCoinStats>) =>
        response.data,
    }),
    adminGetAllCoinBundles: builder.query<
      IAdminCoinBundleDataPayload,
      IPaginationParams | void
    >({
      query: (params) => `/admin/coin/all${createQueryParams(params)}`,
      providesTags: ["Coin"] as const,
    }),
    adminGetCoinBundleById: builder.query<IAdminCoinBundle, string>({
      query: (id) => `/admin/coin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Coin", id }],
      transformResponse: (response: WithStatus<IAdminCoinBundle>) =>
        response.data,
    }),
    adminCreateCoin: builder.mutation<void, ICreateCoinParams>({
      invalidatesTags: ["Coin"] as const, // update all coins query
      query: ({
        price,
        thumbnail,
        coin_amount,
        is_active,
        is_custom = false,
      }) => {
        const formData = new FormData();
        formData.append("coin_amount", coin_amount.toString());
        formData.append("price", price.toString());
        formData.append("thumbnail", thumbnail);
        formData.append("is_active", String(is_active));

        if (is_custom === true) {
          formData.append("is_custom", String(is_custom));
        }

        return {
          url: "/admin/coin",
          method: "POST",
          body: formData,
        };
      },
    }),
    adminUpdateCoin: builder.mutation<void, IUpdateCoinParams>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Coin", id: arg.id },
        "Coin",
      ],
      query: ({ id, price, coin_amount, thumbnail, is_active }) => {
        const formData = new FormData();

        if (coin_amount !== undefined) {
          formData.append("coin_amount", coin_amount.toString());
        }

        if (price !== undefined) {
          formData.append("price", price.toString());
        }

        if (thumbnail) {
          formData.append("thumbnail", thumbnail);
        }

        if (typeof is_active === "boolean") {
          formData.append("is_active", String(is_active));
        }

        return {
          url: `/admin/coin/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    adminDeleteCoin: builder.mutation<void, { id: string; isCustom?: boolean }>(
      {
        invalidatesTags: (_result, _error, arg) => [
          { type: "Coin", id: arg.id },
          "Coin",
        ],
        query: ({ id }) => ({
          url: `/admin/coin/${id}`,
          method: "DELETE",
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          // Only run manual cache update for custom bundle
          if (arg.isCustom) {
            const patchResult = dispatch(
              coinApis.util.updateQueryData(
                "adminGetCustomCoinBundle",
                undefined,
                (draft) => {
                  // If your query returns a single object:
                  return null as any; // remove it completely
                  // OR if it returns array:
                  // return draft.filter(item => item.id !== arg.id)
                },
              ),
            );

            try {
              await queryFulfilled;
            } catch {
              // rollback if request fails
              patchResult.undo();
            }
          }
        },
      },
    ),
    // Custom coin bundle ------------------------------------------------
    adminGetCustomCoinBundle: builder.query<IAdminCoinBundle, void>({
      query: () => `/admin/coin/custom`,
      providesTags: () => [{ type: "Coin", id: "CustomBundle" }],
      transformResponse: (response: WithStatus<IAdminCoinBundle>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminGetCoinStatsQuery,
  useAdminCreateCoinMutation,
  useAdminGetCoinBundleByIdQuery,
  useAdminGetAllCoinBundlesQuery,
  useAdminUpdateCoinMutation,
  useAdminDeleteCoinMutation,
  useAdminGetCustomCoinBundleQuery,
} = coinApis;

export default coinApis;
