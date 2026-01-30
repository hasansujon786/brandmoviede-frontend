import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import {
  IAppMyTicketOrderItem,
  IAppOrderStat as IAppOrderStats,
  IAppOrderTableItem,
  IAppTicket,
  IPaginationParams,
  WithPaginationAndStatus,
  WithStatus,
} from "@/types";

export const appOrderApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query<IAppOrderStats, void>({
      query: () => `/order/stats`,
      providesTags: ["Order"] as const,
      transformResponse: (response: WithStatus<IAppOrderStats>) =>
        response.data,
    }),
    getAllOrders: builder.query<
      WithPaginationAndStatus<IAppOrderTableItem[]>,
      IPaginationParams | void
    >({
      query: (params) =>
        `/order${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["Order"] as const,
    }),
    getMyTicketOrders: builder.query<
      WithPaginationAndStatus<IAppMyTicketOrderItem[]>,
      IPaginationParams | void
    >({
      query: (params) =>
        `/order/tickets${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["MyTicketOrder"] as const,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrderStatsQuery,
  useGetAllOrdersQuery,
  useGetMyTicketOrdersQuery,
} = appOrderApis;
