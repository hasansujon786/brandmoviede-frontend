"use client";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import { ChevronDown } from "@/components/shared/icons/chevron";
import { EyeIcon } from "@/components/shared/icons/EyeIcon";
import { PenIcon } from "@/components/shared/icons/PenIcon";
import { TrushIcon } from "@/components/shared/icons/TrushIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createGetVarient } from "@/lib/utils/varients";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

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

interface CoinBundleTableProps {
  data: PackageItem[];
  header: ReactNode;
}

export default function CoinManagementTable({
  data,
  header,
}: CoinBundleTableProps) {
  return (
    <section className="space-y-3">
      <Card>
        {header}
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
