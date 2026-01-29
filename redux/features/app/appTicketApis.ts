import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type {
  IAppTicket,
  IAppTicketDetails,
  IPaginationParams,
  WithPaginationAndStatus,
  WithStatus,
} from "@/types";

const appTicketApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query<
      WithPaginationAndStatus<IAppTicket[]>,
      IPaginationParams | void
    >({
      query: (params) =>
        `/ticket/all${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["Ticket"] as const,
      // transformResponse: (response: WithStatus<IAuthUser>) => response.data,
    }),
    getSingleTicketById: builder.query<IAppTicketDetails, string>({
      query: (id) => `/ticket/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Ticket", id }],
      transformResponse: (response: WithStatus<IAppTicketDetails>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllTicketsQuery, useGetSingleTicketByIdQuery } =
  appTicketApis;
export default appTicketApis;
