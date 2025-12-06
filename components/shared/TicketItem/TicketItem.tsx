import { Badge } from "@/components/ui/badge";
import {
  CalenderDatesIcon,
  ClockIcon,
} from "@/components/shared/icons/CalenderIcon";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Ticket {
  status: string;
  title: string;
  date: string;
  expire_date: string;
  ticket_id: string;
}

export default function TicketItem({
  date,
  expire_date,
  ticket_id,
  status,
  title,
}: Ticket) {
  const info = [
    {
      icon: <CalenderDatesIcon className="size-6" />,
      value: date,
    },
    {
      icon: <ClockIcon className="size-6" />,
      value: expire_date,
    },
  ];

  const isInactive = status === "inactive";

  return (
    <div className="bg-card border-input flex flex-col justify-between gap-4 rounded-2xl border px-4 py-8 lg:flex-row">
      <div className="space-y-2">
        <Badge variant={isInactive ? "destructive" : "success"}>{status}</Badge>
        <h3 className="text-heading-100 font-heading mb-4 text-2xl font-semibold">
          {title}
        </h3>

        <div className="">
          {info.map((item, index) => (
            <div
              key={index}
              className="mt-1 flex items-center gap-1 px-2 text-base text-[#777980]"
            >
              {item.icon}
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col justify-center space-y-2 rounded-xl p-4",
          isInactive ? "bg-primary-200" : "bg-primary",
        )}
      >
        <p className="text-primary-foreground font-heading text-lg font-semibold">
          Ticket ID
        </p>

        <div className="flex w-full justify-between md:gap-x-32">
          <p className="text-primary-foreground font-heading text-3xl font-semibold">
            {ticket_id}
          </p>

          <Button
            className="rounded-[12px] border-transparent"
            variant="secondary"
            size="icon"
          >
            <Copy className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
