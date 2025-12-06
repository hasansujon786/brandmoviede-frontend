import TicketItem, { Ticket } from "../TicketItem/TicketItem";

export const tickets: Ticket[] = [
  {
    status: "active",
    title: "Sugo Connect 2025",
    date: "December 15-17, 2025",
    expire_date: "Expires: 12-17-2025",
    ticket_id: "TKT-SC2025-47392",
  },
  {
    status: "inactive",
    title: "Sugo Connect 2025",
    date: "December 15-17, 2025",
    expire_date: "Expires: 12-17-2025",
    ticket_id: "TKT-SC2025-47392",
  },
  {
    status: "inactive",
    title: "Sugo Connect 2025",
    date: "December 15-17, 2025",
    expire_date: "Expires: 12-17-2025",
    ticket_id: "TKT-SC2025-47392",
  },
];

export default function TicketItemList(props: {
  title: string;
  tickets: Ticket[];
}) {
  return (
    <div className="">
      <h3 className="text-heading-100 font-heading mb-4 text-3xl font-semibold">
        {props.title}
      </h3>
      <div className='space-y-4'>
        {props.tickets.map((ticket, index) => (
          <TicketItem key={index} {...ticket} />
        ))}
      </div>
    </div>
  );
}
