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

export interface IAppMyTicketOrderItem {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  ticket_code?: string;
  event_ticket_id: string;
  amount: number;
  status: string;
  used: boolean;
  transaction_id: string;
  event_ticket: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    title: string;
    description: string;
    about: string;
    ticket_status: string;
    included: string[];
    event_date: string;
    location: string;
    revenue: number;
    ticket_price: number;
    total_sold: number;
    sold_limit: number;
    thumbnail: string;
    status: string;
    user_id: string;
  };
}
