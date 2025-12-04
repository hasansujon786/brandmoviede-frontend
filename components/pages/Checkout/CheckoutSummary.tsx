"use client";

import LockIcon from "@/components/shared/icons/LockIcon";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";

export default function CheckoutSummary() {
  const purchaseInfo = {
    items: [
      { title: "Subtotal", value: "€40 EUR" },
      { title: "Tax", value: "€0.90 EUR" },
    ],
    main: { title: "Total", value: "€40.99 EUR" },
  };

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Order Summary
      </h5>

      <SummaryCard
        className="mt-6"
        items={purchaseInfo.items}
        main={purchaseInfo.main}
      />

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
