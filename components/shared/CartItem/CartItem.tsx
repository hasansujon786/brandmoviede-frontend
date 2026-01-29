"use client";

import { Button } from "@/components/ui/button";
import { config } from "@/constant";
import { formatCurrency, formatPluralNumber } from "@/lib/utils/formatters";
import { CartListItem, removeFromCart } from "@/redux/features/cart/cartSlice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function CartItem(item: CartListItem) {
  const dispatch = useDispatch();
  const handleDelete = async (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="bg-card flex items-center justify-between gap-3 rounded-2xl px-3 py-2 lg:gap-4 lg:px-4 lg:py-3">
      <Image
        unoptimized={config.imageUnoptimized}
        src={item?.data?.thumbnail_url}
        width={72}
        height={72}
        alt=""
        className="aspect-square h-full rounded-md bg-gray-100 object-cover"
      />

      <div className="mr-auto flex flex-col lg:gap-1">
        <p className="text-heading-100 text-xl font-medium">
          {formatCurrency(item?.data?.price)}
        </p>
        <p className="text-sm">
          {formatPluralNumber(item?.data?.coin_amount, "Sugo Coin")}
        </p>
        <p className="text-primary mt-1 text-sm">
          Quantity : {item.quantity || 1}
        </p>
      </div>

      <Button
        onClick={() => handleDelete(item?.data?.id)}
        variant="ghost"
        size="icon"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
