"use client";

import TicketItemList from "@/components/shared/TicketItemList/TicketItemList";
import { useGetMyTicketOrdersQuery } from "@/redux/features/app/appOrderApis";
import { skipToken } from "@reduxjs/toolkit/query";

export default function MyTickets({ showAll = true }: { showAll?: boolean }) {
  const { data: activeTickets } = useGetMyTicketOrdersQuery({
    status: "Active",
  });

  const { data: inactiveTickets } = useGetMyTicketOrdersQuery(
    showAll ? { status: "Inactive" } : skipToken,
  );

  return (
    <section className="space-y-8">
      <TicketItemList
        title="Active Ticket"
        tickets={activeTickets?.data || []}
      />
      {showAll ? (
        <TicketItemList
          title="Inactive Tickets"
          tickets={inactiveTickets?.data || []}
        />
      ) : null}
    </section>
  );
}
