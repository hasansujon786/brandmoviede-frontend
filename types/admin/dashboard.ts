export interface IOrderItem {
  id: string;
  amount: number;
  status: string;
  quantity: number;
  created_at: string;
  user_name: string;
  type: string;
  title: string;
  thumbnail: string;
}

export interface IOverviewStats {
  total_active_users: number;
  total_coin_sold: number;
  total_ticket_sold: number;
  total_revenue: number;
}

export type ISalesAnalyticsChartData = ISalesAnalyticsChartItem[];
export interface ISalesAnalyticsChartItem {
  label: string;
  value: number;
}
