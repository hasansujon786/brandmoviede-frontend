"use client";

import TicketItemList from "@/components/shared/TicketItemList/TicketItemList";
import { useGetMyTicketOrdersQuery } from "@/redux/features/app/appOrderApis";
import { IAppMyTicketOrderItem } from "@/types";

export default function MyTickets({ showAll = true }: { showAll?: boolean }) {
  const { data } = useGetMyTicketOrdersQuery();
  const tickets = data?.data || [];

  const { activeTickets, otherTickets } = tickets.reduce(
    (acc, ticket) => {
      if (ticket.event_ticket.status === "Active") {
        acc.activeTickets.push(ticket);
      } else {
        acc.otherTickets.push(ticket);
      }
      return acc;
    },
    {
      activeTickets: [] as IAppMyTicketOrderItem[],
      otherTickets: [] as IAppMyTicketOrderItem[],
    },
  );

  return (
    <section className="space-y-8">
      <TicketItemList title="Active Ticket" tickets={activeTickets} />
      {showAll ? (
        <TicketItemList title="Inactive Tickets" tickets={otherTickets} />
      ) : null}
    </section>
  );
}
