import AnalyticsOverviewStats from "@/components/pages/Dashboard/Analytics/AnalyticsOverviewStats/AnalyticsOverviewStats";
import MonthlyRevenueChart from "@/components/pages/Dashboard/Analytics/MonthlyRevenueChart/MonthlyRevenueChart";
import SaleDistributionChart from "@/components/pages/Dashboard/Analytics/SaleDistributionChart/SaleDistributionChart";
import TopPerformingEvents from "@/components/pages/Dashboard/Analytics/TopPerformingEvents/TopPerformingEvents";

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-4 p-5">
      {/* <AnalyticsOverviewStats /> */}

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
