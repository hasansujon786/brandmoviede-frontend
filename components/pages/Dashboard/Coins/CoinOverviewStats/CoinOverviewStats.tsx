"use client";

import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import { CoinExchangeIcon } from "@/components/shared/icons/CoinIcon";
import { CreditCardExchangeIcon } from "@/components/shared/icons/CreditCardIcon";
import FireIcon from "@/components/shared/icons/FireIcon";
import { LockWithDollarSignIcon } from "@/components/shared/icons/LockIcon";
import { formatCurrency } from "@/lib/utils/formatters";
import {
  useAdminGetCoinStatsQuery,
  useAdminGetOwnerCoinInfoQuery,
} from "@/redux/features/admin/coinApis";

export default function CoinOverviewStats() {
  const { data, isLoading } = useAdminGetCoinStatsQuery();
  const { data: ownerInfo, isLoading: isOwnerInfoLoading } =
    useAdminGetOwnerCoinInfoQuery();

  const infoCards = [
    {
      title: "Total Coin Bundles (Active / Inactive)",
      icon: <LockWithDollarSignIcon />,
      value: `${(data?.total_active_coin_bundles ?? 0).toLocaleString()} / ${(data?.total_inactive_coin_bundles ?? 0).toLocaleString()}`,
    },
    {
      title: "Total Coins Sold",
      icon: <CoinExchangeIcon />,
      value: (data?.total_coin_sold ?? 0).toLocaleString(),
    },
    {
      title: "Tocal Coins Left",
      icon: <FireIcon />,
      value: ownerInfo?.balance
        ? parseInt(ownerInfo?.balance).toLocaleString()
        : 0,
    },
    {
      title: "Total Revenue",
      icon: <CreditCardExchangeIcon />,
      value: formatCurrency(data?.total_revenue),
    },
  ];

  return (
    <DashboardInfoCardList
      isLoading={isLoading || isOwnerInfoLoading}
      data={infoCards}
    />
  );
}
