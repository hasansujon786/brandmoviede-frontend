import {
  Analytics2Icon,
  DoubleCoinIcon,
  TicketIcon,
} from "@/components/dashboard/AppSidebar/AppSidebarIcons";
import SalesAnalyticsChart from "@/components/pages/Dashboard/Home/SalesAnalyticsChart/SalesAnalyticsChart";
import RecentOrderList from "@/components/pages/Dashboard/Home/RecentOrderList/RecentOrderList";
import UserActivityChart from "@/components/pages/Dashboard/Home/UserActivityChart/UserActivityChart";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import { TwoPeoplesIcon } from "@/components/shared/icons/PeoplesIcon";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  const infoCards = [
    { title: "Total SUGO Coins Sold", icon: DoubleCoinIcon, value: "245,000" },
    { title: "Total Ticket Sold", icon: TicketIcon, value: "1,240" },
    { title: "Total Revenue", icon: TwoPeoplesIcon, value: "$48,200" },
    { title: "Active Users", icon: Analytics2Icon, value: "8,400" },
  ];

  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <Button size="lg" variant="primary-inverse">
            Add Event
          </Button>
          <Button size="lg" variant="primary">
            Add Coin Bundle
          </Button>
        </div>
      </TopActionBar>
      <DashboardInfoCardList data={infoCards} />

      <section className="grid grid-cols-[1fr_292px] gap-4">
        <div className="flex-1">
          <SalesAnalyticsChart />
        </div>
        <div>
          <RecentOrderList />
        </div>
      </section>

      <section className="">
        <UserActivityChart />
      </section>
    </div>
  );
}
