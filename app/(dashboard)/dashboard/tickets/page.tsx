import { TicketIcon } from "@/components/dashboard/AppSidebar/AppSidebarIcons";
import CreateEventTicketDialog from "@/components/dashboard/CreateEventTicketDialog/CreateEventTicketDialog";
import DashboardInfoCardList from "@/components/dashboard/DashboardInfoCardList/DashboardInfoCardList";
import TopActionBar from "@/components/dashboard/TopActionBar/TopActionBar";
import EventTicketTable from "@/components/pages/Dashboard/Tickets/EventTicketTable/EventTicketTable";
import { CreditCardExchangeIcon } from "@/components/shared/icons/CreditCardIcon";
import { MessageWitPipeIcon } from "@/components/shared/icons/MessageIcon";
import { TicketWithTextIcon } from "@/components/shared/icons/TicketIcon";
import { Button } from "@/components/ui/button";

export default function DashboardTicketsPage() {
  const infoCards = [
    { title: "Total Tickets Sold", icon: TicketIcon, value: "5,132" },
    {
      title: "Tickets Redeemed",
      icon: CreditCardExchangeIcon,
      value: "592",
    },
    { title: "Upcoming Events", icon: MessageWitPipeIcon, value: "23" },
    {
      title: "Active Ticket",
      icon: TicketWithTextIcon,
      value: "16",
    },
  ];

  return (
    <div className="space-y-4 p-5">
      <TopActionBar>
        <div className="flex items-center gap-4">
          <CreateEventTicketDialog>
            <Button size="lg" variant="primary">
              Add Event Ticket
            </Button>
          </CreateEventTicketDialog>
        </div>
      </TopActionBar>
      <DashboardInfoCardList data={infoCards} />

      <EventTicketTable />
    </div>
  );
}
