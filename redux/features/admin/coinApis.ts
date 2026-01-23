import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import {
  IAdminCoinBundleDataPayload,
  ICreateCoinParams,
  IPaginationParams,
} from "@/types";

const coinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoinBundlesAdmin: builder.query<
      IAdminCoinBundleDataPayload,
      IPaginationParams | void
    >({
      query: (params) => `/admin/coin/all${createQueryParams(params)}`,
      providesTags: ["Coin"] as const,
    }),
    createCoin: builder.mutation<void, ICreateCoinParams>({
      invalidatesTags: ["Coin"] as const,
      query: ({ price, thumbnail, coin_amount }) => {
        const formData = new FormData();
        formData.append("coin_amount", coin_amount.toString());
        formData.append("price", price.toString());
        formData.append("thumbnail", thumbnail);
        // TODO: update all coins query

        return {
          url: "/admin/coin",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCoinMutation, useGetAllCoinBundlesAdminQuery } =
  coinApis;

export default coinApis;
