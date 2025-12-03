import InsideLook from "@/components/pages/tickets/InsideLook";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import TicketCard from "@/components/shared/TicketCard/TicketCard";
import { Ticket } from "lucide-react";

const tickets = [
  {
    title: "Sugo Connect 2025",
    type: "MOST_POPULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
  },
  {
    title: "Sugo Developers 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
    
  },
  {
    title: "Sugo Creators Summit",
    type: "NEW",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
  },
  {
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
  },
  {
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
  },
  {
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: '/images/tickets/bg-ticket-card.png'
  },
];

export default function EventTicketPage() {
  return (
    <div className="pt-20">
      <SectionHeading
        h2
        eyebrow="SHOP"
        description="Limited tickets available. Don't miss out."
      >
        Event <span className="text-primary">Ticket</span> Shop
      </SectionHeading>

      <div className="custom-container my-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((item) => (
          <TicketCard key={item.title} {...item} />
        ))}
      </div>

      <InsideLook />
    </div>
  );
}
