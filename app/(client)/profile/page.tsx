"use client";

import OrderStats from "@/components/pages/Profile/Dashboard/OrderStats/OrderStats";
import { PaginationPageProvider } from "@/components/shared/DataTable/PaginationPageProvider";
import OrderTable from "@/components/shared/OrderTable/OrderTable";
import TicketItemList from "@/components/shared/TicketItemList/TicketItemList";

export default function ProfileDashboardPage() {
  return (
    <div className="space-y-8">
      <OrderStats />

      <OrderTable limit={3} title="Recent Orders" shoPagination={false} />

      <PaginationPageProvider>
        <TicketItemList status="Active" title="Active Tickets" />
      </PaginationPageProvider>
    </div>
  );
}
