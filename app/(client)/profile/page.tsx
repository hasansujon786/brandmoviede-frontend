import HeadsetIcon from "@/components/shared/icons/HeadsetIcon";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
import { TodoListChecked } from "@/components/shared/icons/CheckMark";
import RecentOrders from "@/components/pages/Profile/Dashboard/RecentOrders/RecentOrders";

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
      <section>
        <div className="grid grid-cols-2 gap-6">
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
    </div>
  );
}
