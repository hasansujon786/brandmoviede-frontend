import { ITicketStatus } from "../admin";

export interface IAppTicket {
  id: string;
  title: string;
  description: string;
  ticket_price: number;
  thumbnail: string;
  sold_limit: number;
  total_sold: number;
  event_date: string;
  location: string;
  status: string;
  ticket_status: ITicketStatus;
  created_at: string;
}

export interface IAppTicketDetails {
  id: string;
  title: string;
  description: string;
  about: string;
  included: string[];
  ticket_price: number;
  status: string;
  ticket_status: ITicketStatus;
  sold_limit: number;
  event_date: string;
  location: string;
  thumbnail: string;
  revenue: number;
  total_sold: number;
  created_at: string;
}

export interface IAppTicketCheckoutOrderParams {
  items: TicketCheckoutOrderItem[];
}

export interface TicketCheckoutOrderItem {
  ticket_id: string;
  quantity: number;
}
