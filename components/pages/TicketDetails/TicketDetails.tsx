import NavigationLink from "@/components/shared/NavigationLink/NavigationLink";
import Image from "next/image";
import { CheckCircle } from "@/components/shared/icons/CheckMark";
import { Button } from "@/components/ui/button";
import CalenderIcon from "@/components/shared/icons/CalenderIcon";
import LocationPinIcon from "@/components/shared/icons/LocationPinIcon";
import PeoplesIcon from "@/components/shared/icons/PeoplesIcon";
import HighlightNthWord from "@/components/shared/HighlightNthWord/HighlightNthWord";
import InfoCard from "@/components/shared/InfoCard/InfoCard";

const ticketDetails = {
  id: "01",
  title: "Sugo Connect 2025",
  type: "MOST_POPULAR",
  desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
  subtitle:
    "Join the premier gathering of Sugo Chat enthusiasts for three days of networking, workshops, and exclusive announcements.",
  price: "€149 EUR",
  ticketAvailableCount: "267 tickets left",
  date: "December 15-17, 2025",
  location: "San Francisco, CA",
  peopleCapacity: "Up to 500 attendees",
  image: "/images/tickets/bg-ticket-card.png",
  aboutTheEvent: [
    "Sugo Connect 2025 is our annual flagship event bringing together the vibrant community of Sugo Chat users, creators, and industry leaders. This three-day experience is designed to inspire, educate, and connect.",
    "Attendees will enjoy exclusive access to product announcements, hands-on workshops, networking sessions, and keynote presentations from thought leaders in the tech and communication space.",
    "Whether you're a long-time user or new to the Sugo ecosystem, this event offers something for everyone. Don't miss this opportunity to be part of our growing community.",
  ],
  includedFeatures: [
    "3 day event",
    "All keynote sessions",
    "Workshop participation",
    "Networking events",
    "Exclusive Sugo swag bag",
    "Lunch & refreshments",
    "Digital certificate of attendance",
    "Post-event recordings access",
  ],
};

export default function TicketDetails() {
  const {
    title,
    date,
    location,
    peopleCapacity,
    subtitle,
    image,
    aboutTheEvent,
    includedFeatures,
  } = ticketDetails;

  const infoCards = [
    {
      icon: <CalenderIcon className="size-6" />,
      label: "Date & Time",
      value: [date, "9:00 AM - 6:00 PM daily"],
    },
    {
      icon: <LocationPinIcon className="size-6" />,
      label: "Location",
      value: [
        "San Francisco Convention Center 747 Howard St, San Francisco, CA",
      ],
    },
    {
      icon: <PeoplesIcon className="size-6" />,
      label: "Capacity",
      value: [peopleCapacity, "267 tickets remaining"],
    },
  ];

  return (
    <div>
      <div className="custom-container py-10 lg:py-20">
        <NavigationLink href="/tickets">
          Event Tickets / Tickets Details
        </NavigationLink>

        <section className="mt-8">
          <Image
            src={image}
            className="aspect-[4.7826086957] h-[276px] rounded-xl object-cover object-center"
            width={1320}
            height={276}
            alt=""
          />

          <div className="mt-8 flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center">
            <HighlightNthWord
              className="text-h2 leading-[132%] font-semibold"
              title={title}
              n={2}
            />

            <Button variant="primary">Get Your Ticket</Button>
          </div>
          <p className="mt-4 text-base">{subtitle}</p>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h5 className="text-xl font-medium">About The Event</h5>
            {aboutTheEvent.map((item, index) => (
              <p className="text-base" key={index}>
                {item}
              </p>
            ))}
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
