import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecentOrderList() {
  const items = [
    {
      userName: "Alex D",
      price: "$45.99",
      productType: "Bundle",
      boughtAt: "12 min ago",
    },
    {
      userName: "Sarah",
      price: "$45.99",
      productType: "Custom Bundle",
      boughtAt: "12 min ago",
    },
    {
      userName: "A. Smith",
      price: "$45.99",
      productType: "Event Ticket",
      boughtAt: "12 min ago",
    },
    {
      userName: "A. Smith",
      price: "$45.99",
      productType: "Event Ticket",
      boughtAt: "12 min ago",
    },
  ];
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-2lg bg-[#F8FAFB] p-3 space-y-2">
            <div className="font-heading text-heading-100 flex items-center justify-between text-base font-medium">
              <h6>{item.userName}</h6>
              <h6>{item.price}</h6>
            </div>
            <div className="text-body-200 flex items-center justify-between text-sm">
              <h6>{item.productType}</h6>
              <h6>{item.boughtAt}</h6>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
