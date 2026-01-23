"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import CoinManagementTable, { PackageItem } from "./CoinManagementTable";
import { PaginationPageProvider } from "@/components/shared/DataTable/PaginationPageProvider";

export default function SingleCoinTable() {
  const data = getData();
  return (
    <PaginationPageProvider>
      <CoinManagementTable
        header={
          <CardHeader>
            <CardTitle>Single Coint</CardTitle>
          </CardHeader>
        }
        data={data}
      />
    </PaginationPageProvider>
  );
}

export function getData() {
  const packages: PackageItem[] = [
    {
      packageName: 41352,
      coinsAmount: "1 Sugo",
      price: 10.99,
      totalSales: 1232,
      status: "Active",
    },
  ];

  return packages;
}
