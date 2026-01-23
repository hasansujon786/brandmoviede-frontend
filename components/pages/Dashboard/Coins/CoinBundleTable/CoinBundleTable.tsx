"use client";

import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TimeRangeSelector from "@/components/shared/TimeRangeSelector/TimeRangeSelector";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllCoinBundlesAdminQuery } from "@/redux/features/admin/coinApis";
import { useState } from "react";
import CoinManagementTable from "./CoinManagementTable";

export default function CoinBundleTable() {
  return (
    <PaginationPageProvider>
      <CoinBundleTableContent />
    </PaginationPageProvider>
  );
}

function CoinBundleTableContent() {
  const { page } = usePaginationPage();
  const { data } = useGetAllCoinBundlesAdminQuery({ page: page });
  usePaginatedQuery(data);

  const [timeRange, setTimeRange] = useState("90d");

  return (
    <CoinManagementTable
      data={data?.data || []}
      header={
        <CardHeader className="flex items-center gap-2">
          <CardTitle>Coins Bundle</CardTitle>

          <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
        </CardHeader>
      }
    />
  );
}
