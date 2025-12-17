import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopPerformingEvents() {
  const topTickets = [
    {
      title: "Summer Film Festival 2025",
      date: "Aug, 12, 2025",
      price: "$482",
      soldAmount: "450/500",
    },
    {
      title: "Summer Film Festival 2025",
      date: "Aug, 12, 2025",
      price: "$482",
      soldAmount: "450/500",
    },
    {
      title: "Summer Film Festival 2025",
      date: "Aug, 12, 2025",
      price: "$482",
      soldAmount: "450/500",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Performing Events</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pb-0">
        {topTickets.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5"
          >
            <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full">
              {index + 1}
            </div>
            <div className="mr-auto">
              <p className="text-heading-100">{item.title}</p>
              <p className="text-sm">{item.date}</p>
            </div>
            <div className="text-right">
              <p className="text-primary text-lg font-medium">{item.price}</p>
              <p className="text-xs">{item.soldAmount}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
