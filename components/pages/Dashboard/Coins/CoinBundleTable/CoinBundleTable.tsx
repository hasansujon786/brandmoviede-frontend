"use client";

import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TableSearchInput from "@/components/shared/DataTable/TableSearchInput";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { isArrayEmpty } from "@/lib/utils";
import { useAdminGetAllCoinBundlesQuery } from "@/redux/features/admin/coinApis";
import CoinManagementTable from "./CoinManagementTable";

export default function CoinBundleTable() {
  return (
    <PaginationPageProvider>
      <CoinBundleTableContent />
    </PaginationPageProvider>
  );
}

function CoinBundleTableContent() {
  const { page, searchedId } = usePaginationPage();
  const { data } = useAdminGetAllCoinBundlesQuery({
    page: page,
    search: searchedId,
  });
  usePaginatedQuery(data);

  return (
    <CoinManagementTable
      data={data?.data || []}
      header={
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>Coins Bundle</CardTitle>
          <TableSearchInput shouldResetOnBlur={isArrayEmpty(data?.data)} />
        </CardHeader>
      }
    />
  );
}
