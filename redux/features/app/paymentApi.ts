import { baseApi } from "@/redux/api/baseApi";

interface CreateTicketOrderRequest {
  ticket_id: string;
}

interface CreateTicketOrderResponse {
  success: boolean;
  message: string;
  data: {
    client_secret: string;
    order_id: string;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTicketOrder: builder.mutation<
      CreateTicketOrderResponse,
      CreateTicketOrderRequest
    >({
      query: (body) => ({
        url: "/ticket/order",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateTicketOrderMutation } = paymentApi;
