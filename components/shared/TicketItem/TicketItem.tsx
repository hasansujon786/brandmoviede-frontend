import { CalenderDatesIcon } from "@/components/shared/icons/CalenderIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getFormatedDate } from "@/lib/utils";
import { IAppMyTicketOrderItem } from "@/types";
import { Copy, FlagTriangleRight } from "lucide-react";
import { toast } from "sonner";

export default function TicketItem({
  event_ticket,
  event_ticket_id,
  status,
}: IAppMyTicketOrderItem) {
  const info = [
    {
      icon: <CalenderDatesIcon className="size-6" />,
      value: getFormatedDate(event_ticket.event_date),
    },
    {
      icon: <FlagTriangleRight className="size-6" />,
      value: event_ticket.location,
    },
  ];

  const isInactive = status === "Inactive";
  const handleCopyTicketId = () => {
    navigator.clipboard.writeText(event_ticket_id);
    toast.success("Event Ticket ID copied");
  };

  return (
    <div className="bg-card border-input flex flex-col justify-between gap-4 rounded-2xl border p-3 lg:flex-row lg:px-4 lg:py-8">
      <div className="space-y-2">
        <Badge variant={isInactive ? "destructive" : "success"}>{status}</Badge>
        <h3 className="text-heading-100 font-heading mb-4 text-2xl font-semibold">
          {event_ticket.title}
        </h3>

        <div className="space-y-2">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 text-base text-[#777980]"
            >
              {item.icon}
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "relative flex flex-col justify-center rounded-xl p-3 lg:space-y-2 lg:p-4",
          isInactive ? "bg-primary-200" : "bg-primary",
        )}
      >
        <p className="text-primary-foreground font-heading text-lg font-semibold">
          Ticket ID
        </p>

        <Button
          onClick={handleCopyTicketId}
          className="absolute right-2 shrink-0 rounded-[12px] border-transparent md:hidden"
          variant="secondary"
          size="icon"
        >
          <Copy className="size-6" />
        </Button>

        <div className="flex w-full items-center justify-between gap-0 md:gap-x-32">
          <p className="text-primary-foreground font-heading text-sm font-semibold md:text-2xl lg:text-3xl">
            {event_ticket_id}
          </p>

          <Button
            onClick={handleCopyTicketId}
            className="hidden shrink-0 rounded-[12px] border-transparent md:inline-flex"
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
