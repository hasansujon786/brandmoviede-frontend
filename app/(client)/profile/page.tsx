"use client";

import { SignOutIcon } from "@/components/dashboard/AppSidebar/AppSidebarIcons";
import ActiveTicket from "@/components/pages/Profile/Dashboard/ActiveTicket/ActiveTicket";
import RecentOrders from "@/components/pages/Profile/Dashboard/RecentOrders/RecentOrders";
import { TodoListChecked } from "@/components/shared/icons/CheckMark";
import HeadsetIcon from "@/components/shared/icons/HeadsetIcon";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/redux/features/auth/hooks";

const infoCards = [
  {
    icon: <TodoListChecked className="size-6" />,
    label: "Total Orders",
    value: ["4"],
  },
  {
    icon: <HeadsetIcon className="size-6" />,
    label: "Active Tickets",
    value: ["1"],
  },
];

export default function ProfileDashboardPage() {
  const { logOut } = useAuth();

  return (
    <div className="space-y-8">
      <Button onClick={logOut}>
        <SignOutIcon className="size-6" />
        Log Out
      </Button>

      <section className="@container">
        <div className="grid gap-4 lg:gap-6 @xs:grid-cols-2">
          {infoCards.map((item) => (
            <InfoCard
              className="aspect-auto items-start"
              variant="light"
              key={item.label}
              {...item}
            />
          ))}
        </div>
      </section>

      <section className="">
        <RecentOrders />
      </section>

      <section className="">
        <ActiveTicket />
      </section>
    </div>
  );
}
