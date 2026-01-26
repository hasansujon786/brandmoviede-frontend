import { baseApi } from "@/redux/api/baseApi";
import {
  IMonthlyRevenueComparisonChart,
  ISaleDistributionPieChart,
  ITopPerformingEventList,
  WithStatus,
} from "@/types";
import mock from "./analyticsApisMock.json";
import { createQueryParams } from "@/lib/utils/formatters";

const analyticsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetMonthlyRevenueComparisonChart: builder.query<
      IMonthlyRevenueComparisonChart,
      void
    >({
      query: () => `/admin/analytics/monthly-revenue-comparison`,
      // providesTags: ["AdminAnalytics"], // optional
      transformResponse: (
        response: WithStatus<IMonthlyRevenueComparisonChart>,
      ) => response.data,
      // ) => mock.adminGetMonthlyRevenueComparisonChart,
    }),
    adminGetTopPerformingEvents: builder.query<
      ITopPerformingEventList,
      void | { limit: number }
    >({
      query: (params = { limit : 4 }) =>
        `/admin/analytics/top-performing-events${createQueryParams(params)}`,
      transformResponse: (response: WithStatus<ITopPerformingEventList>) =>
        response.data,
    }),
    adminGetSaleDistributionPieChart: builder.query<
      ISaleDistributionPieChart,
      void
    >({
      query: () => "/admin/analytics/sale-distribution",
      transformResponse: (response: WithStatus<ISaleDistributionPieChart>) =>
        response.data,
      // mock.adminGetSaleDistributionPieChart,
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminGetMonthlyRevenueComparisonChartQuery,
  useAdminGetTopPerformingEventsQuery,
  useAdminGetSaleDistributionPieChartQuery,
} = analyticsApis;

export default analyticsApis;
