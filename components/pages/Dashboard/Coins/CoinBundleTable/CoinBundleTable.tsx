"use client";

import TimeRangeSelector from "@/components/shared/TimeRangeSelector/TimeRangeSelector";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllCoinBundlesAdminQuery } from "@/redux/features/admin/coinApis";
import { useState } from "react";
import CoinManagementTable, { PackageItem } from "./CoinManagementTable";

export default function CoinBundleTable() {
  const { data = [] } = useGetAllCoinBundlesAdminQuery();
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <CoinManagementTable
      data={data}
      header={
        <CardHeader className="flex items-center gap-2">
          <CardTitle>Coins Bundle</CardTitle>

          <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
        </CardHeader>
      }
    />
  );
}
