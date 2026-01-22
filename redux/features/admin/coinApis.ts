import { baseApi } from "@/redux/api/baseApi";
import { IAdminCoinBundle, ICreateCoinParams, WithStatus } from "@/types";

const coinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoinBundlesAdmin: builder.query<IAdminCoinBundle[], void>({
      query: () => `/admin/coin/all`,
      providesTags: ["Coin"] as const,
      transformResponse: (response: WithStatus<IAdminCoinBundle[]>) =>
        response.data,
    }),
    createCoin: builder.mutation<void, ICreateCoinParams>({
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
