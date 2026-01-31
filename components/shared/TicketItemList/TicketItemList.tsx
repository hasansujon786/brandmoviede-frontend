"use client";

import { useGetMyTicketOrdersQuery } from "@/redux/features/app/appOrderApis";
import TicketItem from "../TicketItem/TicketItem";
import {
  usePaginationPage,
  usePaginatedQuery,
} from "../DataTable/PaginationPageProvider";
import { Pagenation } from "../DataTable/DataTable";

export default function TicketItemList(props: {
  title: string;
  status: "Active" | "Inactive";
}) {
  const { page } = usePaginationPage();
  const { data } = useGetMyTicketOrdersQuery({
    limit: 5,
    status: props.status,
    page: page,
  });
  usePaginatedQuery(data);
  const tickets = data?.data || [];

  return (
    <div className="">
      <h3 className="text-heading-100 font-heading mb-4 text-3xl font-semibold">
        {props.title}
      </h3>
      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <TicketItem key={index} {...ticket} status={props.status} />
        ))}
      </div>

      <div className="mt-3">
        <Pagenation />
      </div>
    </div>
  );
}
