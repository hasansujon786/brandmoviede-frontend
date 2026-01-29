"use client";

import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";
import { Button } from "@/components/ui/button";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CartSummary() {
  const purchaseInfo = {
    items: [
      { title: "Subtotal", value: "€40 EUR" },
      { title: "Tax", value: "€0.90 EUR" },
    ],
    main: { title: "Total", value: "€40.99 EUR" },
  };

  const cartItems = useSelector(selectCartItems);
  const router = useRouter();

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
        <Button
          disabled={cartItems.length < 1}
          onClick={() => router.push("/checkout")}
          className="w-full"
          variant="primary"
        >
          Proceed to Checkout
        </Button>

        <Button
          asChild
          className="text-foreground h-8 w-full font-normal"
          variant="link"
        >
          <Link href="/bundles">Conitnue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
