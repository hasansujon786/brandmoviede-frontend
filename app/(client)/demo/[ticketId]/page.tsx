"use client";

import TicketCheckout from "@/components/auth/TicketCheckout";
import { useParams } from "next/navigation";

export default function DemoPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  return (
    <div className="pt-40">
      <h1 className="text-6xl">{ticketId}</h1>
      <TicketCheckout ticketId={ticketId} />
    </div>
  );
}
