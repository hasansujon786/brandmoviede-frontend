import HeadsetIcon from "@/components/shared/icons/HeadsetIcon";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
import { TodoListChecked } from "@/components/shared/icons/CheckMark";
import RecentOrders from "@/components/pages/Profile/Dashboard/RecentOrders/RecentOrders";
import ActiveTicket from "@/components/pages/Profile/Dashboard/ActiveTicket/ActiveTicket";

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
  return (
    <div className="space-y-8">
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
