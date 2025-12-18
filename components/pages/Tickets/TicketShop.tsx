import TicketCard from "@/components/shared/TicketCard/TicketCard";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Pagenation } from "@/components/shared/DataTable/DataTable";

const tickets = [
  {
    id: "01",
    title: "Sugo Connect 2025",
    type: "MOST_POPULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
  {
    id: "02",
    title: "Sugo Developers 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
  {
    id: "03",
    title: "Sugo Creators Summit",
    type: "NEW",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
  {
    id: "04",
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
  {
    id: "05",
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
  {
    id: "06",
    title: "Sugo Connect 2025",
    type: "REGULAR",
    desc: "Premier gathering of Sugo Chat enthusiasts for networking and workshops",
    price: "€149 EUR",
    ticketAvailableCount: "267 tickets left",
    date: "December 15-17, 2025",
    location: "San Francisco, CA",
    peopleCapacity: "Up to 500 attendees",
    image: "/images/tickets/bg-ticket-card.png",
  },
];

export default function TicketShop() {
  return (
    <div className="py-10 lg:py-20">
      <SectionHeading
        h2
        eyebrow="SHOP"
        description="Limited tickets available. Don't miss out."
      >
        Event <span className="text-primary">Ticket</span> Shop
      </SectionHeading>
      <section className="custom-container mt-8 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {tickets.map((item, index) => (
          <TicketCard key={index} {...item} />
        ))}
      </section>

      <div className="custom-container mt-8">
        <Pagenation />
      </div>
    </div>
  );
}
