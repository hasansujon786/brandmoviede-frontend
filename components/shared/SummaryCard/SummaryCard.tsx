"use client";

import { cn } from "@/lib/utils";

interface SummaryCardProps extends React.ComponentProps<"div"> {
  items: { title: string; value: string }[];
  main: { title: string; value: string };
}

export default function SummaryCard({
  children,
  className,
  items,
  main,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "bg-card flex flex-col gap-4 rounded-[12px] p-4",
        className,
      )}
    >
      {children}

      <div className="space-y-3">
        {Array.isArray(items)
          ? items.map((item) => (
              <div
                className="text-body-200 flex items-center justify-between text-lg"
                key={item.title}
              >
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
            ))
          : null}
      </div>

      <hr className="border-text-200 my-1" />

      <div className="text-heading-100 flex items-center justify-between text-lg font-medium">
        <span>{main.title}</span>
        <span>{main.value}</span>
      </div>
    </div>
  );
}
