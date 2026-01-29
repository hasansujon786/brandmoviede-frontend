"use client";

import CartItem from "@/components/shared/CartItem/CartItem";
import { formatPluralNumber } from "@/lib/utils/formatters";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useSelector } from "react-redux";

export default function CartList() {
  const cartItems = useSelector(selectCartItems);

  return (
    <div>
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
    </div>
  );
}
