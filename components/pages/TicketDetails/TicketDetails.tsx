"use client";
import HighlightNthWord from "@/components/shared/HighlightNthWord/HighlightNthWord";
import CalenderIcon from "@/components/shared/icons/CalenderIcon";
import { CheckCircle } from "@/components/shared/icons/CheckMark";
import LocationPinIcon from "@/components/shared/icons/LocationPinIcon";
import PeoplesIcon from "@/components/shared/icons/PeoplesIcon";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
import NavigationLink from "@/components/shared/NavigationLink/NavigationLink";
import { Button } from "@/components/ui/button";
import { config } from "@/constant";
import { getFormatedDate } from "@/lib/utils";
import { formatPluralNumber } from "@/lib/utils/formatters";
import { useGetSingleTicketByIdQuery } from "@/redux/features/app/appTicketApis";
import { useAppCart } from "@/redux/features/cart/cartHooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function TicketDetails() {
  const router = useRouter();
  const { ticketId } = useParams<{ ticketId: string }>();

  const { data: ticket, isLoading } = useGetSingleTicketByIdQuery(ticketId);
  const includedFeatures = ticket?.included ?? [];

  const { onBuyTicket } = useAppCart();

  const infoCards = [
    {
      icon: <CalenderIcon className="size-6" />,
      label: "Date",
      value: [getFormatedDate(ticket?.event_date, "MMMM DD, YYYY")],
    },
    {
      icon: <LocationPinIcon className="size-6" />,
      label: "Location",
      value: [ticket?.location ?? ""],
    },
    {
      icon: <PeoplesIcon className="size-6" />,
      label: "Capacity",
      value: [
        `Up to ${ticket?.sold_limit} attendees`,
        `${formatPluralNumber((ticket?.sold_limit ?? 0) - (ticket?.total_sold ?? 0), "ticket")} tickets remaining`,
      ],
    },
  ];

  return (
    <div>
      <div className="custom-container py-10 lg:py-20">
        <NavigationLink onClick={router.back} href="#">
          Event Tickets / Tickets Details
        </NavigationLink>

        <section className="mt-8">
          <Image
            src={ticket?.thumbnail as string}
            className="aspect-[4.7826086957] h-[276px] rounded-xl object-cover object-center"
            width={1320}
            height={276}
            unoptimized={config.imageUnoptimized}
            alt=""
          />

          <div className="mt-8 flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center">
            <HighlightNthWord
              className="text-h2 leading-[132%] font-semibold"
              title={ticket?.title ?? ""}
              n={2}
            />

            <Button
              onClick={() => {
                if (ticket) onBuyTicket({ data: ticket, quantity: 1 });
              }}
              variant="primary"
            >
              Get Your Ticket
            </Button>
          </div>
          <p className="mt-4 max-w-4xl text-base">{ticket?.description}</p>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h5 className="text-xl font-medium">About The Event</h5>
            {ticket?.about}
          </div>

          <div>
            <h5 className="text-xl font-medium">What’s Included</h5>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {includedFeatures.map((item) => (
                <li className="flex items-center gap-3 text-base" key={item}>
                  <CheckCircle />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="bg-background-lighten py-10 lg:py-20">
        <div className="custom-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infoCards.map((item, index) => (
            <InfoCard
              className="last:col-span-full lg:last:col-auto"
              key={index}
              {...item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
