import CreateCoinBundleDialog from "@/components/dashboard/CreateCoinBundleDialog/CreateCoinBundleDialog";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import AllCoinPurchaseTable from "@/components/pages/Dashboard/Coins/AllCoinPurchaseTable/AllCoinPurchaseTable";
import CoinBundleTable from "@/components/pages/Dashboard/Coins/CoinBundleTable/CoinBundleTable";
import CoinOverviewStats from "@/components/pages/Dashboard/Coins/CoinOverviewStats/CoinOverviewStats";
import { Button } from "@/components/ui/button";

export default function DashboardCoinsPage() {
  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <CreateCoinBundleDialog mode="create">
            <Button size="lg" variant="primary">
              Add Coin Bundle
            </Button>
          </CreateCoinBundleDialog>
        </div>
      </TopActionBar>

      <CoinOverviewStats />

      <section className="space-y-8">
        {/* <SingleCoinTable /> */}

        <CoinBundleTable />

        <AllCoinPurchaseTable />
      </section>
    </div>
  );
}
