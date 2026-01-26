"use client";

import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import {
  PeopleWithCirclIcon,
  TwoPeoplesIcon,
} from "@/components/shared/icons/PeoplesIcon";
import { PercentageIcon } from "@/components/shared/icons/PercentageIcon";
import { TrafficIcon } from "@/components/shared/icons/TrafficIcon";

export default function AnalyticsOverviewStats() {
  const infoCards = [
    { title: "Daily Active Users", icon: <TwoPeoplesIcon />, value: "1,240" },
    {
      title: "Monthly Active Users",
      icon: <PeopleWithCirclIcon />,
      value: "245,000",
    },
    { title: "Conversion Rate", icon: <PercentageIcon />, value: "$48,200" },
    { title: "Website Traffic", icon: <TrafficIcon />, value: "58%" },
  ];

  return <DashboardInfoCardList isLoading={false} data={infoCards} />;
}
