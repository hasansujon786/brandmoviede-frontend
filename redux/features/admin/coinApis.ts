import { baseApi } from "@/redux/api/baseApi";
import { ICreateCoinParams } from "@/types/coin/coin";

const coinApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoin: builder.mutation<void, ICreateCoinParams>({
      query: ({ price, thumbnail, coin_amount }) => {
        const formData = new FormData();
        formData.append("coin_amount", coin_amount.toString());
        formData.append("price", price.toString());
        formData.append("thumbnail", thumbnail);

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

export const { useCreateCoinMutation } = coinApis;

export default coinApis;
