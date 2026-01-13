"use client";
import TimeRangeSelector from "@/components/shared/TimeRangeSelector/TimeRangeSelector";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import CoinManagementTable, { PackageItem } from "./CoinManagementTable";

export default function CoinBundleTable() {
  const data = getData();
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <CoinManagementTable
      header={
        <CardHeader className="flex items-center gap-2">
          <CardTitle>Coins Bundle</CardTitle>

          <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
        </CardHeader>
      }
      data={data}
    />
  );
}

export function getData() {
  const packages: PackageItem[] = [
    {
      packageName: 41352,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 1232,
      status: "Active",
    },
    {
      packageName: 554683,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 564,
      status: "Active",
    },
    {
      packageName: 153884,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 5451,
      status: "Inactive",
    },
    {
      packageName: 541588,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 5423,
      status: "Active",
    },
    {
      packageName: 874512,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 4992,
      status: "Active",
    },
    {
      packageName: 875489,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 2545,
      status: "Inactive",
    },
    {
      packageName: 546685,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 541,
      status: "Active",
    },
    {
      packageName: 65481,
      coinsAmount: "100 Sugo",
      price: 10.99,
      totalSales: 874,
      status: "Inactive",
    },
  ];

  return packages;
}
