"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import { useGetAllOrdersQuery } from "@/redux/features/app/appOrderApis";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "../DataTable/PaginationPageProvider";
import { IAppOrderTableItem } from "@/types";
import { getFormatedDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/formatters";
import { createGetVarient } from "@/lib/utils/varients";

export const statusVariantMap = {
  active: "info",
  inactive: "brown",
  completed: "success",
  pending: "yellow",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export interface OrderItem {
  order_id: string;
  date: string;
  items: string;
  total: string;
  status: "Completed" | "Pending" | "Cancelled" | string;
}

export const columns: ColumnDef<IAppOrderTableItem>[] = [
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => getFormatedDate(row.original.created_at),
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Items",
    accessorKey: "title",
  },
  {
    header: "Total",
    accessorKey: "amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Status",
    accessorKey: "status",
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
];

interface OrderTableProps {
  title: string;
  limit?: number;
  shoPagination?: boolean;
}

export default function OrderTable(props: OrderTableProps) {
  return (
    <PaginationPageProvider>
      <OrderTableContent {...props} />
    </PaginationPageProvider>
  );
}

function OrderTableContent({
  shoPagination = true,
  title,
  limit,
}: OrderTableProps) {
  const { page } = usePaginationPage();
  const { data } = useGetAllOrdersQuery({ page, limit: limit });
  usePaginatedQuery(data);

  return (
    <section className="space-y-3">
      <h3 className="text-heading-100 font-heading text-3xl font-semibold">
        {title}
      </h3>
      <DataTable columns={columns} data={data?.data || []} />
      {shoPagination && <Pagenation />}
    </section>
  );
}
