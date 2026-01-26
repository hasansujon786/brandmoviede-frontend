import { Skeleton } from "@/components/ui/skeleton";
import { isArrayEmpty } from "@/lib/utils";
import React from "react";

interface InfoCardListProps {
  isLoading?: boolean;
  data: {
    title: string;
    icon: React.ReactNode;
    value: string | number;
  }[];
}

export default function DashboardInfoCardList({
  data,
  isLoading,
}: InfoCardListProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {!isArrayEmpty(data) &&
        data?.map((info) => (
          <div
            key={info.title}
            className="bg-card flex items-center gap-4 rounded-2xl border px-4 py-5"
          >
            <div className="text-primary flex size-14 items-center justify-center rounded-full border border-[#F8C0CC] bg-[#DFE1E7]/25 *:size-6">
              {info.icon}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm">{info.title}</div>
              {isLoading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <div className="text-heading-100 text-xl font-semibold">
                  {info.value}
                </div>
              )}
            </div>
          </div>
        ))}
    </section>
  );
}
