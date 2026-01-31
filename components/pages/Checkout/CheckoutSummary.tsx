"use client";

import LockIcon from "@/components/shared/icons/LockIcon";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";
import { formatCurrency } from "@/lib/utils/formatters";
import { selectCurrentSelectedTicket } from "@/redux/features/cart/cartSlice";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { CartListSummary } from "../Cart/CartList";

export default function CheckoutSummary() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") as "coin" | "ticket" | null;

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Order Summary
      </h5>

      {type === "coin" ? <CartListSummary /> : null}
      {type === "ticket" ? <CheckoutTicketSummary /> : null}

      <div className="bg-card/50 mt-4 flex flex-col gap-2 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <LockIcon className="text-heading-100" />
          <p className="text-heading-100 text-base font-medium">
            Secure Payment
          </p>
        </div>

        <p className="text-body-200 text-base">
          All transactions are encrypted and secure
        </p>
      </div>
    </div>
  );
}

function CheckoutTicketSummary() {
  const currentTicket = useSelector(selectCurrentSelectedTicket);

  if (!currentTicket) {
    return null;
  }
  const quantity = currentTicket.quantity || 1;
  const totalPirce = quantity * (currentTicket?.data?.ticket_price ?? 0);

  return (
    <SummaryCard
      className="mt-6"
      items={[{ title: "Ticket", value: currentTicket.quantity || 1 }]}
      main={{ title: "Total Price", value: formatCurrency(totalPirce) }}
    />
  );
}
