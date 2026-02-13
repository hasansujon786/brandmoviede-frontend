"use client";

import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TableSearchInput from "@/components/shared/DataTable/TableSearchInput";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getFormatedDate, isArrayEmpty } from "@/lib/utils";
import { createGetVarient } from "@/lib/utils/varients";
import {
  useAdminToggleTicketUsedStatusMutation,
  useGetRecentOrdersQuery,
} from "@/redux/api";
import { IOrderItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const statusVariantMap = {
  active: "info",
  inactive: "brown",
  completed: "success",
  pending: "yellow",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");

export type PurchaseStatus = keyof typeof statusVariantMap;

export const columns: ColumnDef<IOrderItem>[] = [
  {
    accessorKey: "user_name",
    header: "User Name",
  },
  {
    accessorKey: "ticket_title",
    header: "Ticket Title",
  },
  {
    accessorKey: "ticket_number",
    header: "Ticket Number",
  },
  {
    accessorKey: "payment_date",
    header: "Payment Date",
    cell: ({ row }) => getFormatedDate(row.original?.payment_date),
  },
  {
    accessorKey: "ticket_price",
    header: "Ticket Price",
    cell: ({ row }) => `$${row.original.ticket_price}`,
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
    accessorKey: "used",
    header: "Ticket Used",
    cell: ({ row }) => (
      <ToggleUsedStatus
        id={row.original.id}
        used={
          typeof row.original.used === "boolean" ? row.original.used : false
        }
      />
    ),
  },
];

function ToggleUsedStatus({
  used = false,
  id,
}: {
  used?: boolean;
  id: string;
}) {
  const [toggleUsedStatus] = useAdminToggleTicketUsedStatusMutation();
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={used}
        onClick={() => toggleUsedStatus({ id })}
        id={`toggle-ticke-used-${id}`}
      />
      <Label className="cursor-pointer" htmlFor={`toggle-ticke-used-${id}`}>
        Mark as Used
      </Label>
    </div>
  );
}

export default function EventTicketPurchaseTable() {
  return (
    <PaginationPageProvider>
      <EventTicketPurchaseTableContent />
    </PaginationPageProvider>
  );
}

function EventTicketPurchaseTableContent() {
  const { page, searchedId } = usePaginationPage();
  const { data, isLoading, isError } = useGetRecentOrdersQuery({
    type: "TICKET",
    page,
    search: searchedId,
  });
  usePaginatedQuery(data);

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>Event Ticket Purchase</CardTitle>

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
