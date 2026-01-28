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
