"use client";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TableSearchInput from "@/components/shared/DataTable/TableSearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFormatedDate, isArrayEmpty } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/formatters";
import { createGetVarient } from "@/lib/utils/varients";
import { useGetRecentOrdersQuery } from "@/redux/api";
import { IOrderItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

export const statusVariantMap = {
  active: "info",
  inactive: "brown",
  completed: "success",
  pending: "yellow",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export type PackageStatus = keyof typeof statusVariantMap;

export const columns: ColumnDef<IOrderItem>[] = [
  {
    accessorKey: "user_name",
    header: "User Name",
  },
  {
    accessorKey: "coin_name",
    header: "Package Name",
  },
  {
    accessorKey: "payment_date",
    header: "Payment Date",
    cell: ({ row }) => getFormatedDate(row.original?.payment_date),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatCurrency(row.original?.price ?? 0),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => row.original?.quantity ?? "N/A",
  },
  {
    accessorKey: "amount",
    header: "Coins Amount",
    cell: ({ row }) => row.original?.coin_amount ?? "N/A",
  },
  {
    accessorKey: "sugo_id",
    header: "Sugo ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      const varient = getStatusVariant(status);

      return (
        <Badge className="capitalize" variant={varient}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status_msg",
    header: "Transfer Status",
    cell: ({ row }) => {
      const items = [
        { label: "Status Code", value: row.original?.status_code },
        { label: "Status Message", value: row.original?.status_msg },
        { label: "Payment Method", value: row.original?.payment_method },
        { label: "Payment Number", value: row.original?.payment_number },
      ];

      return (
        <div className="grid place-items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
                variant="primary-secondary"
                size="icon-sm"
              >
                <EyeIcon className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-sm" align="end">
              <ul className="divide-y *:py-3">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center justify-between gap-2 font-medium`}
                  >
                    <span className="text-muted-foreground">{item.label}:</span>
                    <span>{item.value ?? "N/A"}</span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

export default function AllCoinPurchaseTable() {
  return (
    <PaginationPageProvider>
      <AllCoinPurchaseTableConotent />
    </PaginationPageProvider>
  );
}

function AllCoinPurchaseTableConotent() {
  const { page, searchedId } = usePaginationPage();
  const { data, isLoading, isError } = useGetRecentOrdersQuery({
    type: "COIN",
    page,
    search: searchedId,
  });
  usePaginatedQuery(data);

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>All Coin Purchase</CardTitle>

          <TableSearchInput shouldResetOnBlur={isArrayEmpty(data?.data)} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground flex h-[250px] w-full items-center justify-center text-sm">
              Loading table data...
            </div>
          ) : isError ? (
            <div className="text-destructive flex h-[250px] w-full items-center justify-center text-sm">
              Failed to load table data
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={data?.data || []}
              config={{
                borderColor: "#F8C0CC",
                headerClass: "bg-primary hover:bg-primary",
              }}
            />
          )}
        </CardContent>
      </Card>

      <Pagenation ghostBtn />
    </section>
  );
}
