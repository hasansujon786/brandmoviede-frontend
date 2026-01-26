import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import {
  IPaginationParams,
  IAdminTicketListDataPayload,
  IAdminCreateTicketParams,
  IAdminCreateTicketPayload,
  IAdminSingleTicket,
  WithStatus,
  IAdminTicketStats,
} from "@/types";

const ticketApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetTicketStats: builder.query<IAdminTicketStats, void>({
      query: () => `/admin/coin/stats`,
      transformResponse: (response: WithStatus<IAdminTicketStats>) =>
        response.data,
    }),
    adminGetAllTickets: builder.query<
      IAdminTicketListDataPayload,
      IPaginationParams | void
    >({
      query: (params) => `/admin/ticket/all${createQueryParams(params)}`,
      providesTags: ["Ticket"] as const,
    }),
    adminGetTicketById: builder.query<IAdminSingleTicket, string>({
      query: (id) => `/admin/ticket/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Ticket", id }],
      transformResponse: (response: WithStatus<IAdminSingleTicket>) =>
        response.data,
    }),
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
          is_active,
        } = params;
        formData.append("is_active", String(is_active));
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
    adminUpdateTicket: builder.mutation<
      IAdminCreateTicketPayload,
      Partial<IAdminCreateTicketParams> & { id: string } // all fields optional except id
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Ticket", id: arg.id },
        "Ticket",
      ],
      query: (params) => {
        const { id, included, thumbnail, ...rest } = params;

        const formData = new FormData();

        // Append only defined fields
        Object.entries(rest).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (key === "ticket_price" || key === "sold_limit") {
              formData.append(key, value.toString());
            } else if (key === "event_date") {
              formData.append(
                key,
                new Date(value as string | Date).toISOString(),
              );
            } else {
              formData.append(key, value as string);
            }
          }
        });

        // Append included array if exists
        if (included && Array.isArray(included)) {
          included.forEach((item) => {
            formData.append("included[]", item);
          });
        }

        // Append thumbnail if exists
        if (thumbnail) {
          formData.append("thumbnail", thumbnail);
        }

        return {
          url: `/admin/ticket/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
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
  useAdminGetTicketStatsQuery,
  useAdminGetAllTicketsQuery,
  useAdminGetTicketByIdQuery,
  useAdminDeleteTicketByIdMutation,
  useAdminCreateTicketMutation,
  useAdminUpdateTicketMutation,
} = ticketApis;

export default ticketApis;
