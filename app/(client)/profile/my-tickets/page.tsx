import { PaginationPageProvider } from "@/components/shared/DataTable/PaginationPageProvider";
import TicketItemList from "@/components/shared/TicketItemList/TicketItemList";

export default function MyTicketsPage() {
  return (
    <div className="space-y-8">
      <PaginationPageProvider>
        <TicketItemList status="Active" title="Active Ticket" />
      </PaginationPageProvider>

      <PaginationPageProvider>
        <TicketItemList status="Inactive" title="Inactive Tickets" />
      </PaginationPageProvider>
    </div>
  );
}
