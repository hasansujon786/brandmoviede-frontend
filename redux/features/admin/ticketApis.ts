import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import {
  IPaginationParams,
  IAdminTicketListDataPayload,
  IAdminCreateTicketParams,
  IAdminCreateTicketPayload,
} from "@/types";

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
    adminCreateTicket: builder.mutation<
      IAdminCreateTicketPayload,
      IAdminCreateTicketParams
    >({
      invalidatesTags: ["Ticket"],
      query: (params) => {
        const formData = new FormData();
        const {
          title,
          description,
          about,
          included,
          ticket_price,
          sold_limit,
          event_date,
          location,
          ticket_status,
          thumbnail,
        } = params;

        formData.append("title", title);
        formData.append("description", description);
        formData.append("about", about);
        formData.append("ticket_price", ticket_price.toString());
        formData.append("sold_limit", sold_limit.toString());
        formData.append("event_date", new Date(event_date).toISOString());
        formData.append("location", location);
        formData.append("ticket_status", ticket_status);
        formData.append("thumbnail", thumbnail);

        included.forEach((item) => {
          formData.append("included[]", item);
        });

        return {
          url: "/admin/ticket",
          method: "POST",
          body: formData,
        };
      },
    }),
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

export const {
  useAdminGetAllTicketsQuery,
  useAdminDeleteTicketByIdMutation,
  useAdminCreateTicketMutation,
} = ticketApis;

export default ticketApis;
