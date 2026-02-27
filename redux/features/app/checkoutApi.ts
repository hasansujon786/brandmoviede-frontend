import { baseApi } from "@/redux/api/baseApi";
import { IAppTicketCheckoutOrderParams, WithStatus } from "@/types";

export interface IAppCoinCheckoutOrderParams {
  sugoId: string;
  items: {
    bundle_id: string;
    quantity?: number;
    coin_amount?: number;
  }[];
}

export interface IAppCoinCheckoutOrderResponse {
  client_secret: string;
  transaction_id: string;
  orders: string[];
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoinCheckoutOrder: builder.mutation<
      WithStatus<IAppCoinCheckoutOrderResponse>,
      IAppCoinCheckoutOrderParams
    >({
      query: ({ sugoId, items }) => {
        return {
          url: "/coin/checkout/order",
          method: "POST",
          body: { sugo_id: sugoId, items: items },
        };
      },
      // transformResponse: (
      //   response: WithStatus<IAppCoinCheckoutOrderResponse>,
      // ) => response.data,
    }),
    createTicketCheckoutOrder: builder.mutation<
      IAppCoinCheckoutOrderResponse,
      IAppTicketCheckoutOrderParams
    >({
      query: ({ items }) => ({
        url: "/ticket/checkout/order",
        method: "POST",
        body: { items },
      }),
      transformResponse: (
        response: WithStatus<IAppCoinCheckoutOrderResponse>,
      ) => response.data,
    }),
    // getAllCoinCheckoutDraft: builder.query<
    //   IAppCoinCartCheckoutDraftList[],
    //   void
    // >({
    //   query: () => `/coin/checkout`,
    //   providesTags: ["CoinCheckoutDraft"] as const,
    //   transformResponse: (
    //     response: WithStatus<IAppCoinCartCheckoutDraftList[]>,
    //   ) => response.data,
    // }),
    // createCoinCheckoutDraft: builder.mutation<unknown, IAppCoinCheckoutParams>({
    //   invalidatesTags: ["CoinCheckoutDraft"] as const, // update all coins query
    //   query: (body) => ({
    //     url: "/coin/checkout",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    // deleteCheckoutDraftItemById: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/coin/checkout/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["CoinCheckoutDraft"] as const,
    // }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCoinCheckoutOrderMutation,
  useCreateTicketCheckoutOrderMutation,
} = paymentApi;
