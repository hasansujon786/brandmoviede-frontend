import TicketItemList, {
  tickets,
} from "../../../shared/TicketItemList/TicketItemList";
export default function MyTickets() {
  return (
    <>
      <TicketItemList title="Active Ticket" tickets={tickets.slice(0, 1)} />
      <TicketItemList title="Inactive Tickets" tickets={tickets.slice(1)} />
    </>
  );
}
