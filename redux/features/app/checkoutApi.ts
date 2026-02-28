import { baseApi } from "@/redux/api/baseApi";
import { IAppTicketCheckoutOrderParams, WithStatus } from "@/types";
import {
  CapturePaypalOrderError,
  CapturePaypalOrderRequest,
  CapturePaypalOrderResponse,
  IAppCoinCheckoutOrderPaypalParams,
  IAppCoinCheckoutOrderResponse,
  IAppCoinCheckoutOrderResponsePaypal,
  IAppTicketCheckoutOrderParamsPaypal,
  IAppTicketCheckoutOrderResponsePaypal,
} from "@/types/app/checkout";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoinCheckoutOrder: builder.mutation<
      WithStatus<IAppCoinCheckoutOrderResponse>,
      IAppCoinCheckoutOrderPaypalParams
    >({
      query: ({ sugoId, items }) => {
        return {
          url: "/coin/checkout/order",
          method: "POST",
          body: { sugo_id: sugoId, items: items },
        };
      },
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

    // paypal
    capturePaypalOrder: builder.mutation<
      CapturePaypalOrderResponse | CapturePaypalOrderError,
      CapturePaypalOrderRequest
    >({
      query: ({ orderId }) => ({
        url: "/payment/paypal/capture",
        method: "POST",
        body: { orderId },
      }),
    }),
    createCoinCheckoutOrderWithPaypal: builder.mutation<
      WithStatus<IAppCoinCheckoutOrderResponsePaypal>,
      IAppCoinCheckoutOrderPaypalParams
    >({
      query: ({ sugoId, items }) => {
        return {
          url: "/coin/paypal/checkout/order",
          method: "POST",
          body: { sugo_id: sugoId, items: items },
        };
      },
    }),
    createTicketCheckoutOrderWithPaypal: builder.mutation<
      WithStatus<IAppTicketCheckoutOrderResponsePaypal>,
      IAppTicketCheckoutOrderParamsPaypal
    >({
      query: ({ ticketId }) => {
        return {
          url: "/ticket/paypal/order",
          method: "POST",
          body: { ticket_id: ticketId },
        };
      },
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
  useCreateCoinCheckoutOrderWithPaypalMutation,
  useCapturePaypalOrderMutation,
  useCreateTicketCheckoutOrderWithPaypalMutation,
} = paymentApi;
