export interface IOrderItem {
  id: string;
  user_id: string;
  coin_bundle_id: string | null;
  event_ticket_id: string | null;
  transaction_id: string;
  price: number;
  ticket_price: number;
  status: "pending" | "completed" | "failed";
  amount?: number;
  quantity?: number;
  payment_date: string; // ISO date string
  user_name: string;
  type: "COIN" | "TICKET";
  coin_name: string | null;
  ticket_title: string | null;
  thumbnail: string | null;
  ticket_number: string | null;
  payment_number: string;
  used: boolean | null;
  status_code?: number;
  status_msg?: string;
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
export type ISalesAnalyticsChartParams =
  | "lastYear"
  | "lastThreeMonth"
  | "lastMonth"
  | "lastSevenDay";

export interface IUserActivityItem {
  month: string;
  active: number;
  inactive: number;
}
