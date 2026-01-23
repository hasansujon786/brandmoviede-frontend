"use client";

import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import TableSearchInput from "@/components/shared/DataTable/TableSearchInput";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { isArrayEmpty } from "@/lib/utils";
import {
  useAdminUpdateCoinMutation,
  useGetAllCoinBundlesAdminQuery,
} from "@/redux/features/admin/coinApis";
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
  const { data } = useGetAllCoinBundlesAdminQuery({
    page: page,
    search: searchedId,
  });
  usePaginatedQuery(data);

  const [updateCoin, { isLoading }] = useAdminUpdateCoinMutation();

  // const onSubmit = async (value: FormValues) => {
  //   if (!value.thumbnail) return;
  //
  //   await updateCoin({
  //     id: selectedCoinId,
  //     price: Number(value.price),
  //     coin_amount: Number(value.coin_amount),
  //     thumbnail: value.thumbnail,
  //   }).unwrap();
  //
  //   toast.success("Coin updated successfully");
  // };

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
