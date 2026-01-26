"use client";

import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import { CreditCardExchangeIcon } from "@/components/shared/icons/CreditCardIcon";
import { MessageWitPipeIcon } from "@/components/shared/icons/MessageIcon";
import { TicketWithTextIcon } from "@/components/shared/icons/TicketIcon";
import { useAdminGetTicketStatsQuery } from "@/redux/features/admin/ticketApis";
import { TicketIcon } from "lucide-react";

export default function TicketOverviewStats() {
  const { data, isLoading } = useAdminGetTicketStatsQuery();

  const infoCards = [
    {
      title: "Total Tickets Sold",
      icon: <TicketIcon />,
      value: (data?.total_sold ?? 0).toLocaleString(),
    },
    {
      title: "Total Revenue",
      icon: <CreditCardExchangeIcon />,
      value: `$${(data?.total_revenue ?? 0).toLocaleString()}`,
    },
    {
      title: "Upcoming Events",
      icon: <MessageWitPipeIcon />,
      value: (data?.total_upcoming ?? 0).toLocaleString(),
    },
    {
      title: "Tickets (Active / Inactive)",
      icon: <TicketWithTextIcon />,
      value: `${(data?.active_tickets ?? 0).toLocaleString()} / ${(data?.inactive_tickets ?? 0).toLocaleString()}`,
    },
  ];

  return <DashboardInfoCardList isLoading={isLoading} data={infoCards} />;
}
