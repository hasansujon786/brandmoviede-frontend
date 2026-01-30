export interface IAppOrderStat {
  total_order: number;
  total_active_tickets: number;
}

export interface IAppOrderTableItem {
  id: string;
  created_at: string;
  amount: number;
  status: string;
  quantity: number;
  type: string;
  title: string;
  thumbnail: string;
}
