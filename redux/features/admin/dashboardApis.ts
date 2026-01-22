import { createQueryParams } from "@/lib/utils/formatters";
import { baseApi } from "@/redux/api/baseApi";
import type { IPaginationParams, WithStatus } from "@/types";
import {
  IOrderItem,
  IOverviewStats,
  ISalesAnalyticsChartData,
  ISalesAnalyticsChartParams,
  IUserActivityItem,
} from "@/types/admin/dashboard";

import mock from "./mock.json";

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
    getSalesAnalyticsChartData: builder.query<
      ISalesAnalyticsChartData,
      { filtrBy: ISalesAnalyticsChartParams }
    >({
      query: ({ filtrBy }) =>
        `/admin/overview/sales-analytics${createQueryParams({ period: filtrBy })}`,
      providesTags: ["Dashboard"] as const,
      // mock["sales-analytics"].data,
      transformResponse: (response: WithStatus<ISalesAnalyticsChartData>) =>
        response.data,
    }),
    getUserActivityChartData: builder.query<IUserActivityItem[], void>({
      query: () => `/admin/overview/user-activity`,
      providesTags: ["Dashboard"] as const,
      transformResponse: (response: WithStatus<IUserActivityItem[]>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecentOrdersQuery,
  useGetOverviewStatsQuery,
  useGetSalesAnalyticsChartDataQuery,
  useGetUserActivityChartDataQuery
} = dashboardApis;
export default dashboardApis;
