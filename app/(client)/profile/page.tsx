"use client";

import { SignOutIcon } from "@/components/dashboard/AppSidebar/AppSidebarIcons";
import ActiveTicket from "@/components/pages/Profile/Dashboard/ActiveTicket/ActiveTicket";
import OrderStats from "@/components/pages/Profile/Dashboard/OrderStats/OrderStats";
import OrderTable from "@/components/shared/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/redux/features/auth/hooks";

export default function ProfileDashboardPage() {
  const { logOut } = useAuth();

  return (
    <div className="space-y-8">
      <Button onClick={logOut}>
        <SignOutIcon className="size-6" />
        Log Out
      </Button>

      <OrderStats />

      <section className="">
        <OrderTable limit={3} title="Recent Orders" shoPagination={false} />
      </section>

      <section className="">
        <ActiveTicket />
      </section>
    </div>
  );
}
