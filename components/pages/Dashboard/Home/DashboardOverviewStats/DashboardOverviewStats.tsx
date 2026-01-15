"use client";

import {
  Analytics2Icon,
  DoubleCoinIcon,
  TicketIcon,
} from "@/components/dashboard/AppSidebar/AppSidebarIcons";
import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import { TwoPeoplesIcon } from "@/components/shared/icons/PeoplesIcon";
import { useGetOverviewStatsQuery } from "@/redux/api";

export default function DashboardOverviewStats() {
  const { data, isLoading } = useGetOverviewStatsQuery();

  // const infoCards = [
  //   { title: "Total SUGO Coins Sold", icon: DoubleCoinIcon, value: "245,000" },
  //   { title: "Total Ticket Sold", icon: TicketIcon, value: "1,240" },
  //   { title: "Total Revenue", icon: TwoPeoplesIcon, value: "$48,200" },
  //   { title: "Active Users", icon: Analytics2Icon, value: "8,400" },
  // ];

  const infoCards = [
    {
      id: "coins",
      title: "Total SUGO Coins Sold",
      icon: DoubleCoinIcon,
      value: data?.total_coin_sold?.toLocaleString() ?? "—",
    },
    {
      id: "tickets",
      title: "Total Ticket Sold",
      icon: TicketIcon,
      value: data?.total_ticket_sold ?? "—",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      icon: TwoPeoplesIcon,
      value: `$${data?.total_revenue?.toLocaleString() ?? 0}`,
    },
    {
      id: "users",
      title: "Active Users",
      icon: Analytics2Icon,
      value: data?.total_active_users ?? "—",
    },
  ];

  return <DashboardInfoCardList data={infoCards} isLoading={isLoading} />;
}
