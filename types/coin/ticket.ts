import { WithPaginationAndStatus } from "../shared";

export interface ITicket {
  id: string;
  title: string;
  description: string;
  about: string;
  included: string[];
  ticket_price: number;
  status: string;
  sold_limit: number;
  event_date: string;
  location: string;
  thumbnail: string;
  revenue: number;
  total_sold: number;
  created_at: string;
}

export interface ITicketListItem {
  id: string;
  title: string;
  ticket_price: number;
  status: string;
  sold_limit: number;
  event_date: string;
  revenue: number;
  total_sold: number;
  created_at: string;
}

export type IAdminTicketListDataPayload = WithPaginationAndStatus<
  ITicketListItem[]
>;
