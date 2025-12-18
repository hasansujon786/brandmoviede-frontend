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

export type EventStatus = keyof typeof statusVariantMap;

export interface EventItem {
  packageName: string;
  eventDate: string; // or Date if you want to parse it
  revenue: number;
  ticketPrice: number;
  totalTicketSold: {
    sold: number;
    total: number;
  };
  status: EventStatus;
}

export const columns: ColumnDef<EventItem>[] = [
  {
    accessorKey: "packageName",
    header: "Package Name",
  },
  {
    accessorKey: "eventDate",
    header: "Event Date",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => `$${row.original.revenue}`,
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket Price",
    cell: ({ row }) => `$${row.original.ticketPrice}`,
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
  const events: EventItem[] = [
    {
      packageName: "Summer Film Festival",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 482,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Active",
    },
    {
      packageName: "Indie Movie Night",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 552,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Active",
    },
    {
      packageName: "VR Cinema Exp",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 389,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Inactive",
    },
    {
      packageName: "Classic Horror Marathon",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 781,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Active",
    },
    {
      packageName: "Summer Film Festival",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 341,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Active",
    },
    {
      packageName: "Indie Movie Night",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 123,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Inactive",
    },
    {
      packageName: "VR Cinema Exp",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 125,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Active",
    },
    {
      packageName: "Classic Horror Marathon",
      eventDate: "Aug 12, 2025",
      revenue: 12654,
      ticketPrice: 259,
      totalTicketSold: { sold: 450, total: 500 },
      status: "Inactive",
    },
  ];

  return events;
}

export default function EventTicketTable() {
  const data = getData();
  return (
    <section className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Event Ticket</CardTitle>
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

      <Pagenation ghoustBtn />
    </section>
  );
}
