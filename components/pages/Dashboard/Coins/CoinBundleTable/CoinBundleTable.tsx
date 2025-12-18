"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import { ChevronDown } from "@/components/shared/icons/chevron";
import { createGetVarient } from "@/lib/utils/varients";
import { Button } from "@/components/ui/button";
import { TrushIcon } from "@/components/shared/icons/TrushIcon";
import { PenIcon } from "@/components/shared/icons/PenIcon";
import { EyeIcon } from "@/components/shared/icons/EyeIcon";

export const statusVariantMap = {
  Active: "info",
  Inactive: "brown",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export type PackageStatus = keyof typeof statusVariantMap;
export interface PackageItem {
  packageName: number;
  coinsAmount: string;
  price: number;
  totalSales: number;
  status: PackageStatus;
}

export const columns: ColumnDef<PackageItem>[] = [
  {
    accessorKey: "packageName",
    header: "Package Name",
  },
  {
    accessorKey: "coinsAmount",
    header: "Coins Amount",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "totalSales",
    header: "Total Sales",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      const varient = getStatusVariant(status);

      return (
        <Badge variant={varient}>
          <span>{status}</span>
          <ChevronDown />
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button
            className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
            variant="primary-secondary"
            size="icon-sm"
          >
            <EyeIcon className="size-4" />
          </Button>

          <Button
            className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
            variant="primary-secondary"
            size="icon-sm"
          >
            <PenIcon className="size-4" />
          </Button>

          <Button
            className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
            variant="primary-secondary"
            size="icon-sm"
          >
            <TrushIcon className="size-4" />
          </Button>
        </div>
      );
    },
  },
];

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

export default function CoinBundleTable() {
  const data = getData();
  return (
    <section className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Coins Bundle</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            config={{
              borderColor: "#F8C0CC",
              headerClass: "bg-primary hover:bg-primary",
            }}
          />
        </CardContent>
      </Card>

      <Pagenation />
    </section>
  );
}
