import { Button } from "@/components/ui/button";
import Link from "next/link";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";

export default function CartSummary() {
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

      <div className="mt-8 space-y-2">
        <Button asChild className="w-full" variant="primary">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        <Button
          asChild
          className="text-foreground h-8 w-full font-normal"
          variant="link"
        >
          <Link href="/bundels">Conitnue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
