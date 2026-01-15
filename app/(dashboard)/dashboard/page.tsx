import CreateCoinBundleDialog from "@/components/dashboard/CreateCoinBundleDialog/CreateCoinBundleDialog";
import CreateEventTicketDialog from "@/components/dashboard/CreateEventTicketDialog/CreateEventTicketDialog";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import DashboardOverviewStats from "@/components/pages/Dashboard/Home/DashboardOverviewStats/DashboardOverviewStats";
import RecentOrderList from "@/components/pages/Dashboard/Home/RecentOrderList/RecentOrderList";
import SalesAnalyticsChart from "@/components/pages/Dashboard/Home/SalesAnalyticsChart/SalesAnalyticsChart";
import UserActivityChart from "@/components/pages/Dashboard/Home/UserActivityChart/UserActivityChart";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <CreateEventTicketDialog>
            <Button size="lg" variant="primary-inverse">
              Add Event
            </Button>
          </CreateEventTicketDialog>

          <CreateCoinBundleDialog>
            <Button size="lg" variant="primary">
              Add Coin Bundle
            </Button>
          </CreateCoinBundleDialog>
        </div>
      </TopActionBar>

      <DashboardOverviewStats />

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
