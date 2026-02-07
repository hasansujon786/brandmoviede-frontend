"use client";

import { Button } from "@/components/ui/button";
import { config } from "@/constant";
import { getFormatedDate } from "@/lib/utils";
import { formatCurrency, formatPluralNumber } from "@/lib/utils/formatters";
import { useAppCart } from "@/redux/features/cart/cartHooks";
import { useAppDispatch } from "@/redux/store";
import { IAppTicket } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CalenderIcon from "../icons/CalenderIcon";
import LocationPinIcon from "../icons/LocationPinIcon";
import PeoplesIcon from "../icons/PeoplesIcon";
import { TicketBadge } from "../Pill/Pill";

interface TicketCardProps extends IAppTicket {}

export default function TicketCard(props: TicketCardProps) {
  const info = [
    {
      icon: <CalenderIcon />,
      value: getFormatedDate(props?.event_date),
    },
    {
      icon: <LocationPinIcon />,
      value: props.location,
    },
    {
      icon: <PeoplesIcon />,
      value: `Up to ${props.sold_limit} attendees`,
    },
  ];
  const { onBuyTicket } = useAppCart();

  return (
    <div className="slide-up bg-card @container relative rounded-2xl p-3 @xs:p-4">
      <TicketBadge status={props.ticket_status} />
      <h3 className="text-heading-200 mt-4 text-2xl font-semibold @xs:text-3xl">
        {props.title}
      </h3>
      <p className="mt-1 pr-12 text-base leading-[160%] @xs:text-xl">
        {props.description}
      </p>

      <div className="mt-6 aspect-[2.80] min-h-[140px] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={props.thumbnail}
          width={360}
          height={360}
          alt=""
          unoptimized={config.imageUnoptimized}
          className="h-full w-full bg-gray-100 object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 @xs:flex-row-reverse @xs:justify-between">
        <div className="">
          <div className="text-heading-100 text-2xl font-semibold">
            {formatCurrency(props?.ticket_price)}
          </div>
          <div className="text-body-200 mt-2 text-base">
            {formatPluralNumber(props.sold_limit - props.total_sold, "ticket")}{" "}
            left
          </div>
        </div>

        <div className="space-y-2">
          {info.map((item, index) => (
            <div className="flex items-center gap-2 text-base" key={index}>
              <span>{item.icon}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 @xs:grid-cols-2">
        <Button asChild variant="primary-secondary">
          <Link href={`/tickets/${props.id}`}>View Details</Link>
        </Button>

        <Button
          variant="primary"
          onClick={() => onBuyTicket({ data: props, quantity: 1 })}
        >
          Buy Ticket
        </Button>
      </div>
    </div>
  );
}
