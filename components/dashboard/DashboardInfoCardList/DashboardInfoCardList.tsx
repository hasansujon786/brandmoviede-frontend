import { Skeleton } from "@/components/ui/skeleton";

interface InfoCardListProps {
  isLoading?: boolean;
  data: {
    id: string;
    title: string;
    icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
    value: string | number;
  }[];
}

export default function DashboardInfoCardList({
  data,
  isLoading,
}: InfoCardListProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {data.map((info) => (
        <div
          key={info.id}
          className="bg-card flex items-center gap-4 rounded-2xl border px-4 py-5"
        >
          <div className="text-primary flex size-14 items-center justify-center rounded-full border border-[#F8C0CC] bg-[#DFE1E7]/25">
            <info.icon className="size-6" />
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
