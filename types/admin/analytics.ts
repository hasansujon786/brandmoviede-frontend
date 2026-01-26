export type IMonthlyRevenueComparisonChart =
  IMonthlyRevenueComparisonChartItem[];

export interface IMonthlyRevenueComparisonChartItem {
  month: string;
  currentYear: number;
  lastYear: number;
}

export type ITopPerformingEventList = ITopPerformingEventListItem[];

export interface ITopPerformingEventListItem {
  title: string;
  thumbnail: string;
  sold_limit: number;
  total_sold: number;
  ticket_price: number;
  event_date: string;
}

export interface ISaleDistributionPieChart {
  coin: ISaleDistributionPieChartCoin;
  event_ticket: ISaleDistributionPieChartEventTicket;
}

export interface ISaleDistributionPieChartCoin {
  amount: number;
  percentage: number;
}

export interface ISaleDistributionPieChartEventTicket {
  amount: number;
  percentage: number;
}
