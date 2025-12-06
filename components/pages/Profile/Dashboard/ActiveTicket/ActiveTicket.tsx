import { Badge } from "@/components/ui/badge";
import {
  CalenderDatesIcon,
  ClockIcon,
} from "@/components/shared/icons/CalenderIcon";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function ActiveTicket() {
  const info = [
    {
      icon: <CalenderDatesIcon className="size-6" />,
      value: "December 15-17, 2025",
    },
    {
      icon: <ClockIcon className="size-6" />,
      value: "Expires: 12-17-2025",
    },
  ];

  return (
    <div className="">
      <h3 className="text-heading-100 font-heading mb-4 text-3xl font-semibold">
        Active Ticket
      </h3>

      <div className="bg-card border-input flex flex-col justify-between gap-4 rounded-2xl border px-4 py-8 lg:flex-row">
        <div className="space-y-2">
          <Badge variant="success">Active</Badge>
          <h3 className="text-heading-100 font-heading mb-4 text-2xl font-semibold">
            Sugo Connect 2025
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

        <div className="bg-primary flex flex-col justify-center space-y-2 rounded-xl p-4">
          <p className="text-primary-foreground font-heading text-lg font-semibold">
            Ticket ID
          </p>

          <div className="flex w-full justify-between md:gap-x-32">
            <p className="text-primary-foreground font-heading text-3xl font-semibold">
              TKT-SC2025-47392
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
    </div>
  );
}
