import * as z from "zod";
import { WithPaginationAndStatus } from "../shared";
import { IActiveStatus } from "./coin";

export interface IAdminTicketStats {
  total_tickets: number;
  active_tickets: number;
  inactive_tickets: number;
  total_sold: number;
  total_revenue: number;
  total_upcoming: number;
}

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

export interface IAdminSingleTicket {
  id: string;
  title: string;
  description: string;
  about: string;
  included: string[];
  ticket_price: number;
  status: IActiveStatus;
  ticket_status: ITicketStatus;
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
  status: IActiveStatus;
  sold_limit: number;
  event_date: string;
  revenue: number;
  total_sold: number;
  created_at: string;
}
export type IAdminTicketListDataPayload = WithPaginationAndStatus<
  ITicketListItem[]
>;

export const TicketStatusEnum = z.enum(["General", "VIP"]);
export type ITicketStatus = z.infer<typeof TicketStatusEnum>;

export interface IAdminCreateTicketParams {
  title: string;
  description: string;
  is_active: boolean;
  about: string;
  included: string[];
  ticket_price: number;
  sold_limit: number;
  event_date: string; // ISO string
  location: string;
  ticket_status: ITicketStatus;
  thumbnail: File;
}

export interface IAdminCreateTicketPayload {
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
}
