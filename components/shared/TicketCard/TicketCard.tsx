import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CalenderIcon from "../icons/CalenderIcon";
import LocationPinIcon from "../icons/LocationPinIcon";
import PeoplesIcon from "../icons/PeoplesIcon";
import { TicketBadge, TicketStatus } from "../Pill/Pill";

interface TicketCardProps {
  id: string;
  title: string;
  type: string;
  desc: string;
  price: string;
  ticketAvailableCount: string;
  date: string;
  location: string;
  peopleCapacity: string;
  image: string;
}

export default function TicketCard(props: TicketCardProps) {
  const info = [
    {
      icon: <CalenderIcon />,
      value: props.date,
    },
    {
      icon: <LocationPinIcon />,
      value: props.location,
    },
    {
      icon: <PeoplesIcon />,
      value: props.peopleCapacity,
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-4">
      <TicketBadge status={props.type as TicketStatus} />
      <h3 className="text-heading-200 mt-4 text-3xl font-semibold">
        {props.title}
      </h3>
      <p className="mt-1 pr-12 text-xl leading-[160%]">{props.desc}</p>

      <div className="mt-6 aspect-[2.80] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={props.image}
          width={360}
          height={360}
          alt=""
          className="border-card h-full w-full bg-gray-100 object-cover"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <div className="space-y-2">
          {info.map((item, index) => (
            <div className="flex items-center gap-2 text-base" key={index}>
              <span>{item.icon}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="text-right">
          <div className="text-heading-100 text-2xl font-semibold">
            {props.price}
          </div>
          <div className="text-body-200 mt-2 text-base">
            {props.ticketAvailableCount}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button asChild variant="primary-secondary" className="flex-1">
          <Link href={`/tickets/${props.id}`}>View Details</Link>
        </Button>
        <Button variant="primary" className="flex-1">
          Buy Ticket
        </Button>
      </div>
    </div>
  );
}
