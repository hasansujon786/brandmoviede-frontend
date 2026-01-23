"use client";
import CreateCoinBundleDialog from "@/components/dashboard/CreateCoinBundleDialog/CreateCoinBundleDialog";
import { DataTable, Pagenation } from "@/components/shared/DataTable/DataTable";
import { EyeIcon } from "@/components/shared/icons/EyeIcon";
import { PenIcon } from "@/components/shared/icons/PenIcon";
import { TrushIcon } from "@/components/shared/icons/TrushIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useAdminDeleteCoinMutation,
  useAdminUpdateCoinMutation,
} from "@/redux/features/admin/coinApis";
import { IAdminCoinBundle } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ReactNode } from "react";
import { toast } from "sonner";

// TODO: remove this pseudo type
export interface PackageItem {
  packageName: number;
  coinsAmount: string;
  price: number;
  totalSales: number;
  status: string;
}

export const columns: ColumnDef<IAdminCoinBundle>[] = [
  {
    accessorKey: "name",
    header: "Package Name",
  },
  {
    accessorKey: "coin_amount",
    header: "Coins Amount",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total_sold",
    header: "Total Sales",
    cell: ({ row }) => row?.original?.total_sold ?? 0,
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

interface CoinBundleTableProps {
  data: IAdminCoinBundle[];
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

function TableActionCell(props: IAdminCoinBundle) {
  const [deleteCoin, { isLoading: isDeleting }] = useAdminDeleteCoinMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coin?")) return;

    try {
      await deleteCoin({ id }).unwrap();
      toast.success("Coin deleted successfully");
    } catch {
      toast.error("Failed to delete coin");
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
        <Link href={`/bundles/${props?.id}`}>
          <EyeIcon className="size-4" />
        </Link>
      </Button>

      <CreateCoinBundleDialog
        mode="edit"
        initialValues={{
          id: props.id,
          coin_amount: props.coin_amount,
          price: props.price,
          is_active: props.status === "Active",
        }}
      >
        <Button
          className="border-primary-200 text-primary-400 hover:border-primary-400 rounded-md"
          variant="primary-secondary"
          size="icon-sm"
        >
          <PenIcon className="size-4" />
        </Button>
      </CreateCoinBundleDialog>

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

function TableActiveStatusCell({ status, id }: IAdminCoinBundle) {
  const [updateCoin, { isLoading }] = useAdminUpdateCoinMutation();

  const is_active = status === "Active";

  const handleStatusChange = async (newStatus: "Active" | "Inactive") => {
    try {
      await updateCoin({ id, is_active: !is_active }).unwrap();
      toast.success(`Coin status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update coin status");
    }
  };

  return (
    <Select
      disabled={isLoading}
      value={status}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger
        className={cn("w-28 border-transparent bg-current/10", {
          "text-[#007BFF]": is_active,
          "text-[#CF5C56]": !is_active,
        })}
        aria-label={status}
      >
        <SelectValue className="" placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Active" className="rounded-lg">
          Active
        </SelectItem>
        <SelectItem value="Inactive" className="rounded-lg">
          Inactive
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
