"use client";

import { Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import TicketCard from "@/components/shared/TicketCard/TicketCard";
import { useGetAllTicketsQuery } from "@/redux/features/app/appTicketApis";

export default function TicketShop() {
  return (
    <PaginationPageProvider>
      <TicketShopContent />
    </PaginationPageProvider>
  );
}

function TicketShopContent() {
  // useCardRevealAnimation(".ticket-shop");

  const { page } = usePaginationPage();
  // TODO: show loading state
  const { data, isLoading } = useGetAllTicketsQuery({
    page,
    limit: 6,
  });
  usePaginatedQuery(data);

  const tickets = data?.data || [];

  return (
    <div className="ticket-shop _slide-scope py-10 lg:py-20">
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
