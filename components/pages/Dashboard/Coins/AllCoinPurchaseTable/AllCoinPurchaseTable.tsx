"use client";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createGetVarient } from "@/lib/utils/varients";
import { ColumnDef } from "@tanstack/react-table";

export const statusVariantMap = {
  Active: "info",
  Inactive: "brown",
  Completed: "success",
  Pending: "yellow",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export type PackageStatus = keyof typeof statusVariantMap;
export interface PackageItem {
  userName: string;
  packageName: number;
  paymentDate: string;
  price: number;
  coinsAmount: string;
  status: PackageStatus;
}

export const columns: ColumnDef<PackageItem>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "coinsAmount",
    header: "Coins Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      const varient = getStatusVariant(status);

      return <Badge variant={varient}>{status}</Badge>;
    },
  },
];

export function getData() {
  const packages: PackageItem[] = [
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 41352,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Completed",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 554683,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Completed",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 153884,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Pending",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 541588,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Completed",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 874512,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Completed",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 875489,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Pending",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 546685,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Completed",
    },
    {
      userName: "John Doe",
      paymentDate: "April 28, 2016",
      packageName: 65481,
      coinsAmount: "100 Sugo",
      price: 10.99,
      status: "Pending",
    },
  ];

  return packages;
}

export default function AllCoinPurchaseTable() {
  const data = getData();
  return (
    <section className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>All Coin Purchase</CardTitle>
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
