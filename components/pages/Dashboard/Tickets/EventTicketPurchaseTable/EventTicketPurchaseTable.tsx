"use client";

import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import TimeRangeSelector from "@/components/shared/TimeRangeSelector/TimeRangeSelector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { createGetVarient } from "@/lib/utils/varients";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export const statusVariantMap = {
  Active: "info",
  Inactive: "brown",
  Completed: "success",
  Pending: "yellow",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export type PurchaseStatus = keyof typeof statusVariantMap;

export interface EventItem {
  userName: string;
  packageName: string;
  ticketNumber: string;
  paymentDate: string;
  price: number;
  status: PurchaseStatus;
}

export const columns: ColumnDef<EventItem>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
  },
  {
    accessorKey: "ticketNumber",
    header: "Ticket Number",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    accessorKey: "price",
    header: "Ticket Price",
    cell: ({ row }) => `$${row.original.price}`,
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
  const events: EventItem[] = [
    {
      userName: "Arlene McCoy",
      paymentDate: "April 28, 2016",
      price: 482,
      packageName: "Summer Film Festival",
      ticketNumber: "413512",
      status: "Completed",
    },
    {
      userName: "Darlene Robertson",
      paymentDate: "September 24, 2017",
      price: 552,
      packageName: "Indie Movie Night",
      ticketNumber: "564651",
      status: "Completed",
    },
    {
      userName: "Brooklyn Simmons",
      paymentDate: "November 16, 2014",
      price: 389,
      packageName: "VR Cinema Exp",
      ticketNumber: "153584",
      status: "Pending",
    },
    {
      userName: "Guy Hawkins",
      paymentDate: "August 24, 2013",
      price: 781,
      packageName: "Classic Horror Marathon",
      ticketNumber: "541589",
      status: "Completed",
    },
    {
      userName: "Jane Cooper",
      paymentDate: "October 24, 2018",
      price: 341,
      packageName: "Summer Film Festival",
      ticketNumber: "874512",
      status: "Completed",
    },
    {
      userName: "Savannah Nguyen",
      paymentDate: "July 14, 2015",
      price: 123,
      packageName: "Indie Movie Night",
      ticketNumber: "871549",
      status: "Pending",
    },
    {
      userName: "Robert Fox",
      paymentDate: "May 31, 2015",
      price: 125,
      packageName: "VR Cinema Exp",
      ticketNumber: "546655",
      status: "Completed",
    },
    {
      userName: "Theresa Webb",
      paymentDate: "February 28, 2018",
      price: 259,
      packageName: "Classic Horror Marathon",
      ticketNumber: "654511",
      status: "Pending",
    },
  ];

  return events;
}

export default function EventTicketPurchaseTable() {
  const data = getData();
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>Event Ticket Purchase</CardTitle>

          <div className="flex items-center gap-4">
            <InputGroup className="h-12 w-60 rounded-2xl border-[#FFEBF8] bg-white">
              <InputGroupInput
                placeholder="Search..."
                className="placeholder:text-[#D2D2D5]"
              />
              <InputGroupAddon>
                <SearchIcon className="text-[#A5A5AB]" />
              </InputGroupAddon>
            </InputGroup>
            <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
          </div>
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

      {/* <Pagenation ghoustBtn /> */}
    </section>
  );
}
