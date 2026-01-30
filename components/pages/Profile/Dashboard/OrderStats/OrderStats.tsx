"use client";

import { TodoListChecked } from "@/components/shared/icons/CheckMark";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
import { useGetOrderStatsQuery } from "@/redux/features/app/appOrderApis";
import { HeadsetIcon } from "lucide-react";

export default function OrderStats() {
  const { data, isLoading } = useGetOrderStatsQuery();

  const infoCards = [
    {
      icon: <TodoListChecked className="size-6" />,
      label: "Total Orders",
      value: [data?.total_order ?? ""],
    },
    {
      icon: <HeadsetIcon className="size-6" />,
      label: "Active Tickets",
      value: [data?.total_active_tickets ?? ""],
    },
  ];

  return (
    <section className="@container">
      <div className="grid gap-4 lg:gap-6 @xs:grid-cols-2">
        {infoCards.map((item) => (
          <InfoCard
            isLoading={isLoading}
            className="aspect-auto items-start"
            variant="light"
            key={item.label}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
