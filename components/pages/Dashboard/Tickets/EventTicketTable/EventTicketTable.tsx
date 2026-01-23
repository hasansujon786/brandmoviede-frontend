"use client";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import { ChevronDown } from "@/components/shared/icons/chevron";
import { EyeIcon } from "@/components/shared/icons/EyeIcon";
import { PenIcon } from "@/components/shared/icons/PenIcon";
import { TrushIcon } from "@/components/shared/icons/TrushIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createGetVarient } from "@/lib/utils/varients";
import {
  useAdminDeleteTicketByIdMutation,
  useAdminGetAllTicketsQuery,
} from "@/redux/features/admin/ticketApis";
import { ITicketListItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export const statusVariantMap = {
  Active: "info",
  Inactive: "brown",
} as const;
const getStatusVariant = createGetVarient(statusVariantMap, "info");
export type EventStatus = keyof typeof statusVariantMap;

export const columns: ColumnDef<ITicketListItem>[] = [
  {
    accessorKey: "title",
    header: "Ticket Name",
  },
  {
    accessorKey: "event_date",
    header: "Event Date",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => `$${row.original.revenue}`,
  },
  {
    accessorKey: "total_sold",
    header: "Total Ticket Sold",
    cell: ({ row }) => `${row.original.total_sold}/${row.original.sold_limit}`,
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
    cell: ({ row }) => <TableActionCell {...row.original} />,
  },
];

function EventTicketTableContent() {
  useAdminGetAllTicketsQuery();
  const { page, searchedId } = usePaginationPage();
  const { data } = useAdminGetAllTicketsQuery({
    page: page,
    search: searchedId,
  });
  usePaginatedQuery(data);

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle>Event Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.data || []}
            config={{
              borderColor: "#F8C0CC",
              headerClass: "bg-primary hover:bg-primary",
            }}
          />
        </CardContent>
      </Card>

      <Pagenation ghostBtn />
    </section>
  );
}

export default function EventTicketTable() {
  return (
    <PaginationPageProvider>
      <EventTicketTableContent />
    </PaginationPageProvider>
  );
}

function TableActionCell(props: ITicketListItem) {
  const [deleteTicket, { isLoading: isDeleting }] =
    useAdminDeleteTicketByIdMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteTicket({ id }).unwrap();
      toast.success("Ticket deleted successfully");
    } catch {
      toast.error("Failed to delete Ticket");
    }
  };
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
        disabled={isDeleting}
        onClick={() => handleDelete(props.id)}
        className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
        variant="primary-secondary"
        size="icon-sm"
      >
        <TrushIcon className="size-4" />
      </Button>
    </div>
  );
}
