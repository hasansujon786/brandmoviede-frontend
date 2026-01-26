"use client";

import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import { CoinExchangeIcon } from "@/components/shared/icons/CoinIcon";
import { CreditCardExchangeIcon } from "@/components/shared/icons/CreditCardIcon";
import FireIcon from "@/components/shared/icons/FireIcon";
import { LockWithDollarSignIcon } from "@/components/shared/icons/LockIcon";
import { useAdminGetCoinStatsQuery } from "@/redux/features/admin/coinApis";

export default function CoinOverviewStats() {
  const { data, isLoading } = useAdminGetCoinStatsQuery();

  const infoCards = [
    {
      title: "Total Coin Bundles",
      icon: <FireIcon />,
      value: (data?.total_coin_bundles ?? 0).toLocaleString(),
    },
    {
      title: "Coin Bundles (Active / Inactive)",
      icon: <LockWithDollarSignIcon />,
      value: `${(data?.total_active_coin_bundles ?? 0).toLocaleString()} / ${(data?.total_inactive_coin_bundles ?? 0).toLocaleString()}`,
    },
    {
      title: "Total Coins Sold",
      icon: <CoinExchangeIcon />,
      value: (data?.total_coin_sold ?? 0).toLocaleString(),
    },
    {
      title: "Total Revenue",
      icon: <CreditCardExchangeIcon />,
      value: `$${(data?.total_revenue ?? 0).toLocaleString()}`,
    },
  ];

  return <DashboardInfoCardList isLoading={isLoading} data={infoCards} />;
}
