import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type { IPaginationParams, WithStatus } from "@/types";
import { IOrderItem, IOverviewStats } from "@/types/admin/dashboard";

const dashboardApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentOrders: builder.query<IOrderItem[], IPaginationParams | void>({
      query: (params) =>
        `/admin/order${createQueryParams({
          page: params?.page || null,
          limit: params?.limit || null,
        })}`,
      providesTags: ["Dashboard"] as const,
      transformResponse: (response: WithStatus<IOrderItem[]>) => response.data,
    }),
    getOverviewStats: builder.query<IOverviewStats, void>({
      query: () => `/admin/overview/stats`,
      providesTags: ["Dashboard"] as const,
      transformResponse: (response: WithStatus<IOverviewStats>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetRecentOrdersQuery, useGetOverviewStatsQuery } =
  dashboardApis;
export default dashboardApis;
