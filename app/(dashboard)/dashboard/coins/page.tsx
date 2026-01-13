import CreateCoinBundleDialog from "@/components/dashboard/CreateCoinBundleDialog/CreateCoinBundleDialog";
import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import AllCoinPurchaseTable from "@/components/pages/Dashboard/Coins/AllCoinPurchaseTable/AllCoinPurchaseTable";
import CoinBundleTable from "@/components/pages/Dashboard/Coins/CoinBundleTable/CoinBundleTable";
import { CoinExchangeIcon } from "@/components/shared/icons/CoinIcon";
import { CreditCardExchangeIcon } from "@/components/shared/icons/CreditCardIcon";
import FireIcon from "@/components/shared/icons/FireIcon";
import { LockWithDollarSignIcon } from "@/components/shared/icons/LockIcon";
import { Button } from "@/components/ui/button";

export default function DashboardCoinsPage() {
  const infoCards = [
    {
      title: "Total Coins Burned",
      icon: FireIcon,
      value: "1,230,500",
    },
    {
      title: "Total Reserved Coins",
      icon: LockWithDollarSignIcon,
      value: "820,000",
    },
    {
      title: "Total Coins Sold",
      icon: CoinExchangeIcon,
      value: "7,540,000",
    },
    {
      title: "Coins Redeemed",
      icon: CreditCardExchangeIcon,
      value: "4,102,300",
    },
  ];

  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <CreateCoinBundleDialog>
            <Button size="lg" variant="primary">
              Add Coin Bundle
            </Button>
          </CreateCoinBundleDialog>
        </div>
      </TopActionBar>
      <DashboardInfoCardList data={infoCards} />

      <section className="space-y-8">
        <CoinBundleTable />

        <AllCoinPurchaseTable />
      </section>
    </div>
  );
}
