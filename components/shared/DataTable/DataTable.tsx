"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "../icons/chevron";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  config?: {
    borderColor?: string;
    headerClass?: string;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  config = { borderColor: "var(--input)" },
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      style={{
        borderColor: config?.borderColor,
      }}
      className="text-body-200 overflow-hidden rounded-md border"
    >
      <Table className="bg-card">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className={cn(
                "bg-primary-400 hover:bg-primary-400",
                config?.headerClass,
              )}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-primary-foreground"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                style={{
                  borderColor: config?.borderColor,
                }}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface PagenationProps {
  ghoustBtn?: boolean;
}

export function Pagenation({ ghoustBtn = true }: PagenationProps) {
  return (
    <div className="flex gap-6">
      <Button
        variant={ghoustBtn ? "ghost" : "primary-inverse"}
        className="text-body-200"
        size="icon-md"
      >
        <ChevronRight className="rotate-180" />
      </Button>

      <div className="flex gap-0.5">
        <Button variant="primary" size="icon-md">
          1
        </Button>
        <Button variant="ghost" size="icon-md" className="hover:bg-gray-100">
          2
        </Button>
        <Button variant="ghost" size="icon-md" className="hover:bg-gray-100">
          3
        </Button>
        <Button
          disabled
          variant="ghost"
          size="icon-md"
          className="hover:bg-gray-100"
        >
          ...
        </Button>
        <Button variant="ghost" size="icon-md" className="hover:bg-gray-100">
          10
        </Button>
      </div>

      <Button
        variant={ghoustBtn ? "ghost" : "primary-inverse"}
        className="text-body-200"
        size="icon-md"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
