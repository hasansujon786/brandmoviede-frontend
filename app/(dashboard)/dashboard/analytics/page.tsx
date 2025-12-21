import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import MonthlyRevenueChart from "@/components/pages/Dashboard/Analytics/MonthlyRevenueChart/MonthlyRevenueChart";
import SaleDistributionChart from "@/components/pages/Dashboard/Analytics/SaleDistributionChart/SaleDistributionChart";
import TopPerformingEvents from "@/components/pages/Dashboard/Analytics/TopPerformingEvents/TopPerformingEvents";
import {
    PeopleWithCirclIcon,
    TwoPeoplesIcon,
} from "@/components/shared/icons/PeoplesIcon";
import { PercentageIcon } from "@/components/shared/icons/PercentageIcon";
import { TrafficIcon } from "@/components/shared/icons/TrafficIcon";

export default function DashboardAnalyticsPage() {
  const infoCards = [
    { title: "Daily Active Users", icon: TwoPeoplesIcon, value: "1,240" },
    {
      title: "Monthly Active Users",
      icon: PeopleWithCirclIcon,
      value: "245,000",
    },
    { title: "Conversion Rate", icon: PercentageIcon, value: "$48,200" },
    { title: "Website Traffic", icon: TrafficIcon, value: "58%" },
  ];

  return (
    <div className="space-y-4 p-5">
      <DashboardInfoCardList data={infoCards} />

      <section>
        <MonthlyRevenueChart />
      </section>

      <section className="grid grid-cols-[282px_1fr] gap-4">
        <SaleDistributionChart />
        <TopPerformingEvents />
      </section>
    </div>
  );
}
