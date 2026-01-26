import CreateEventTicketDialog from "@/components/dashboard/CreateEventTicketDialog/CreateEventTicketDialog";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import EventTicketPurchaseTable from "@/components/pages/Dashboard/Tickets/EventTicketPurchaseTable/EventTicketPurchaseTable";
import EventTicketTable from "@/components/pages/Dashboard/Tickets/EventTicketTable/EventTicketTable";
import TicketOverviewStats from "@/components/pages/Dashboard/Tickets/TicketOverviewStats/TicketOverviewStats";
import { Button } from "@/components/ui/button";

export default function DashboardTicketsPage() {
  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <CreateEventTicketDialog mode="create">
            <Button size="lg" variant="primary">
              Add Event Ticket
            </Button>
          </CreateEventTicketDialog>
        </div>
      </TopActionBar>
      <TicketOverviewStats />

      <section className="space-y-8">
        <EventTicketTable />
        <EventTicketPurchaseTable />
      </section>
    </div>
  );
}
