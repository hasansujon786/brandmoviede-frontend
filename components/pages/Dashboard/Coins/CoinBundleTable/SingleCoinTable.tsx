"use client";
import { PaginationPageProvider } from "@/components/shared/DataTable/PaginationPageProvider";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { IAdminCoinBundle } from "@/types";
import CoinManagementTable from "./CoinManagementTable";

export default function SingleCoinTable() {
  return (
    <PaginationPageProvider>
      <SingleCoinTableContent />
    </PaginationPageProvider>
  );
}

function SingleCoinTableContent() {
  const data = getData();
  return (
    <CoinManagementTable
      data={data}
      header={
        <CardHeader>
          <CardTitle>Single Coint</CardTitle>
        </CardHeader>
      }
    />
  );
}

export function getData() {
  const packages: IAdminCoinBundle[] = [
    {
      id: "cmkpcgma20002qgm0e84tb0jp",
      name: "MKPCGM9Y",
      price: 234,
      coin_amount: 234,
      total_sold: 123,
      status: "Active",
      created_at: "2026-01-22T11:04:01.994Z",
      updated_at: "2026-01-22T11:04:01.994Z",
    },
  ];

  return packages;
}
