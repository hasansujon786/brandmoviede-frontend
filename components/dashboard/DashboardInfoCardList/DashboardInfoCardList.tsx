interface InfoCardListProps {
  data: {
    title: string;
    icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
    value: string;
  }[];
}

export default function DashboardInfoCardList({ data }: InfoCardListProps) {
  return (
    <section className="grid grid-cols-4 gap-4">
      {data.map((info) => (
        <div
          key={info.title}
          className="bg-card flex items-center gap-4 rounded-2xl border px-4 py-5"
        >
          <div className="text-primary flex size-14 items-center justify-center rounded-full border border-[#F8C0CC] bg-[#DFE1E7]/25">
            <info.icon className="size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">{info.title}</div>
            <div className="text-heading-100 text-xl font-semibold">
              {info.value}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
