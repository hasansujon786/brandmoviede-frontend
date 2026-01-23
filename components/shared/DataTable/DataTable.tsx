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
import { usePaginationPage } from "./PaginationPageProvider";

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

interface PaginationProps {
  ghostBtn?: boolean;
  maxVisible?: number; // how many page buttons to show
}

export function Pagenation({
  ghostBtn = true,
  maxVisible = 4,
}: PaginationProps) {
  const { page, totalPages, nextPage, prevPage, setPage } = usePaginationPage();

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  // Calculate visible pages
  const getPages = () => {
    const pages: number[] = [];

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-6">
      <Button
        onClick={prevPage}
        disabled={!canGoPrev}
        variant={ghostBtn ? "ghost" : "primary-inverse"}
        size="icon-md"
      >
        <ChevronRight className="rotate-180" />
      </Button>

      <div className="flex gap-0.5">
        {/* First page shortcut */}
        {pages[0] > 1 && (
          <>
            <Button
              size="icon-md"
              variant={page === 1 ? "primary" : "ghost"}
              onClick={() => setPage(1)}
            >
              1
            </Button>
            <Button size="icon-md" variant="ghost" disabled>
              …
            </Button>
          </>
        )}

        {pages.map((p) => (
          <Button
            key={p}
            size="icon-md"
            variant={p === page ? "primary" : "ghost"}
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}

        {/* Last page shortcut */}
        {pages[pages.length - 1] < totalPages && (
          <>
            <Button size="icon-md" variant="ghost" disabled>
              …
            </Button>
            <Button
              size="icon-md"
              variant={page === totalPages ? "primary" : "ghost"}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      {/* Next */}
      <Button
        onClick={nextPage}
        disabled={!canGoNext}
        variant={ghostBtn ? "ghost" : "primary-inverse"}
        size="icon-md"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
