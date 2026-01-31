"use client";

import OrderStats from "@/components/pages/Profile/Dashboard/OrderStats/OrderStats";
import MyTickets from "@/components/pages/Profile/MyTickets/MyTickets";
import OrderTable from "@/components/shared/OrderTable/OrderTable";

export default function ProfileDashboardPage() {
  return (
    <div className="space-y-8">
      <OrderStats />

      <OrderTable limit={3} title="Recent Orders" shoPagination={false} />

      <MyTickets showAll={false} />
    </div>
  );
}
