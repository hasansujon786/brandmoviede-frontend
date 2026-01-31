"use client";

import CartItem from "@/components/shared/CartItem/CartItem";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";
import { Button } from "@/components/ui/button";
import {
  createQueryParams,
  formatCurrency,
  formatPluralNumber,
} from "@/lib/utils/formatters";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CartList() {
  const cartItems = useSelector(selectCartItems);
  const router = useRouter();

  return (
    <div className="custom-container grid gap-8 py-10 lg:grid-cols-2 lg:py-20 xl:gap-12">
      <section>
        <h5 className="text-heading-200 font-heading text-3xl font-semibold">
          Shopping Cart
        </h5>

        <p className="mt-3 text-xl">
          {cartItems.length ? (
            <>{formatPluralNumber(cartItems.length, "item")} in your cart</>
          ) : (
            "You don’t have any items in your cart"
          )}
        </p>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.data.id} {...item} />
          ))}
        </div>
      </section>

      <section>
        <h5 className="text-heading-200 font-heading text-3xl font-semibold">
          Order Summary
        </h5>

        <CartListSummary />

        <div className="mt-8 space-y-2">
          <Button
            disabled={cartItems.length < 1}
            onClick={() =>
              router.push(`/checkout${createQueryParams({ type: "coin" })}`)
            }
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
      </section>
    </div>
  );
}

export function CartListSummary() {
  const cartItems = useSelector(selectCartItems);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.quantity * i.data.price,
    0,
  );

  const purchaseInfo = {
    items: [{ title: "Coin Bundles", value: totalItems }],
    main: { title: "Total Price", value: formatCurrency(totalPrice) },
  };

  return (
    <SummaryCard
      className="mt-6"
      items={purchaseInfo.items}
      main={purchaseInfo.main}
    />
  );
}
