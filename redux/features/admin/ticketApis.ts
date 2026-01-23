import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import { IPaginationParams, IAdminTicketListDataPayload } from "@/types";

const ticketApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetAllTickets: builder.query<
      IAdminTicketListDataPayload,
      IPaginationParams | void
    >({
      query: (params) => `/admin/ticket/all${createQueryParams(params)}`,
      providesTags: ["Ticket"] as const,
    }),
    // adminGetCoinBundleById: builder.query<IAdminCoinBundle, string>({
    //   query: (id) => `/admin/coin/${id}`,
    //   providesTags: (_result, _error, id) => [{ type: "Coin", id }],
    //   transformResponse: (response: WithStatus<IAdminCoinBundle>) =>
    //     response.data,
    // }),
    // adminCreateCoin: builder.mutation<void, ICreateCoinParams>({
    //   invalidatesTags: ["Coin"] as const, // update all coins query
    //   query: ({ price, thumbnail, coin_amount, is_active }) => {
    //     const formData = new FormData();
    //     formData.append("coin_amount", coin_amount.toString());
    //     formData.append("price", price.toString());
    //     formData.append("thumbnail", thumbnail);
    //     formData.append("is_active", String(is_active));
    //
    //     return {
    //       url: "/admin/coin",
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    // }),
    // adminUpdateCoin: builder.mutation<void, IUpdateCoinParams>({
    //   invalidatesTags: (_result, _error, arg) => [
    //     { type: "Coin", id: arg.id },
    //     "Coin",
    //   ],
    //   query: ({ id, price, coin_amount, thumbnail, is_active }) => {
    //     const formData = new FormData();
    //
    //     if (coin_amount !== undefined) {
    //       formData.append("coin_amount", coin_amount.toString());
    //     }
    //
    //     if (price !== undefined) {
    //       formData.append("price", price.toString());
    //     }
    //
    //     if (thumbnail) {
    //       formData.append("thumbnail", thumbnail);
    //     }
    //
    //     if (typeof is_active === "boolean") {
    //       formData.append("is_active", String(is_active));
    //     }
    //
    //     return {
    //       url: `/admin/coin/${id}`,
    //       method: "PATCH",
    //       body: formData,
    //     };
    //   },
    // }),
    adminDeleteTicketById: builder.mutation<void, { id: string }>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Ticket", id: arg.id },
        "Ticket",
      ],
      query: ({ id }) => ({
        url: `/admin/ticket/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAdminGetAllTicketsQuery, useAdminDeleteTicketByIdMutation } = ticketApis;

export default ticketApis;
