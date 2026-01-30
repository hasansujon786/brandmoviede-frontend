import { IAppMyTicketOrderItem } from "@/types";
import TicketItem from "../TicketItem/TicketItem";

export default function TicketItemList(props: {
  title: string;
  tickets: IAppMyTicketOrderItem[];
}) {
  return (
    <div className="">
      <h3 className="text-heading-100 font-heading mb-4 text-3xl font-semibold">
        {props.title}
      </h3>
      <div className="space-y-4">
        {props.tickets.map((ticket, index) => (
          <TicketItem key={index} {...ticket} />
        ))}
      </div>
    </div>
  );
}
