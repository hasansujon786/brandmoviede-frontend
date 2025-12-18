"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";

export interface OrderItem {
  order_id: string;
  date: string;
  items: string;
  total: string;
  status: "Completed" | "Pending" | "Cancelled" | string;
}

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      return <Badge variant="success">{status}</Badge>;
    },
  },
];

export function getData() {
  const data: OrderItem[] = [
    {
      order_id: "ORD-2025-001",
      date: "2025-10-15",
      items: "500 Coins",
      total: "$19.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-002",
      date: "2025-10-10",
      items: "Sugo Connect 2025 Ticket",
      total: "$149.00",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
    {
      order_id: "ORD-2025-003",
      date: "2025-09-28",
      items: "1000 Coins",
      total: "$34.99",
      status: "Completed",
    },
  ];

  return data;
}

export default function OrderTable(props: {
  shoPagination?: boolean;
  data: OrderItem[];
  title: string;
}) {
  const { shoPagination = true } = props;
  return (
    <section className="space-y-3">
      <h3 className="text-heading-100 font-heading text-3xl font-semibold">
        {props.title}
      </h3>
      <DataTable columns={columns} data={props.data} />
      {shoPagination && <Pagenation />}
    </section>
  );
}
