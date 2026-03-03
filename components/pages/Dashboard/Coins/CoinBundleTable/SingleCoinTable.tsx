"use client";
import CreateCoinBundleDialog from "@/components/dashboard/CreateCoinBundleDialog/CreateCoinBundleDialog";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import { PaginationPageProvider } from "@/components/shared/DataTable/PaginationPageProvider";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminGetCustomCoinBundleQuery } from "@/redux/api";
import CoinManagementTable from "./CoinManagementTable";

export default function SingleCoinTable() {
  return (
    <PaginationPageProvider>
      <SingleCoinTableContent />
    </PaginationPageProvider>
  );
}

function SingleCoinTableContent() {
  const { data, isLoading, isFetching } = useAdminGetCustomCoinBundleQuery();
  const tableData = data ? [data] : [];

  return (
    <CoinManagementTable
      data={tableData}
      hidePaginatin
      header={
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Custom Coin Bundle</CardTitle>

          <TopActionBar>
            {!data && !(isLoading || isFetching) ? (
              <CreateCoinBundleDialog is_custom={true} mode="create">
                <Button disabled={isLoading} size="lg" variant="primary">
                  Create Custom Coin Bundle
                </Button>
              </CreateCoinBundleDialog>
            ) : null}
          </TopActionBar>
        </CardHeader>
      }
    />
  );
}
