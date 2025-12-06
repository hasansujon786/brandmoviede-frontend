import TicketItemList, {
  tickets,
} from "../../../../shared/TicketItemList/TicketItemList";

export default function ActiveTicket() {
  return <TicketItemList title="Active Ticket" tickets={tickets.slice(0, 1)} />;
}
