"use client";
import CreateEventTicketDialog from "@/components/dashboard/CreateEventTicketDialog/CreateEventTicketDialog";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TableSearchInput from "@/components/shared/DataTable/TableSearchInput";
import { EyeIcon } from "@/components/shared/icons/EyeIcon";
import { PenIcon } from "@/components/shared/icons/PenIcon";
import { TrushIcon } from "@/components/shared/icons/TrushIcon";
import { StatusSelect } from "@/components/shared/StatusSelect/StatusSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormatedDate, isArrayEmpty } from "@/lib/utils";
import {
  useAdminDeleteTicketByIdMutation,
  useAdminGetAllTicketsQuery,
  useAdminUpdateTicketMutation,
} from "@/redux/features/admin/ticketApis";
import { ITicketListItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<ITicketListItem>[] = [
  {
    accessorKey: "title",
    header: "Ticket Name",
  },
  {
    accessorKey: "event_date",
    header: "Event Date",
    cell: ({ row }) => getFormatedDate(row.original.event_date),
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
    cell: ({ row }) => <TableActiveStatusCell {...row.original} />,
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
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>Event Ticket</CardTitle>

          <TableSearchInput shouldResetOnBlur={isArrayEmpty(data?.data)} />
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
        asChild
      >
        <Link target="_blank" href={`/tickets/${props.id}`}>
          <EyeIcon className="size-4" />
        </Link>
      </Button>

      <CreateEventTicketDialog mode="edit" initialValues={props}>
        <Button
          className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
          variant="primary-secondary"
          size="icon-sm"
        >
          <PenIcon className="size-4" />
        </Button>
      </CreateEventTicketDialog>

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

function TableActiveStatusCell({
  status,
  id,
}: Pick<ITicketListItem, "status" | "id">) {
  const [updateCoin, { isLoading }] = useAdminUpdateTicketMutation();

  const is_active = status === "Active";

  const handleStatusChange = async (newStatus: "Active" | "Inactive") => {
    try {
      await updateCoin({ id, is_active: !is_active }).unwrap();
      toast.success(`Ticket status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update ticket status");
    }
  };

  return (
    <StatusSelect
      value={status}
      isLoading={isLoading}
      onChange={handleStatusChange}
    />
  );
}
