import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartItem() {
  return (
    <div className="bg-card flex items-center justify-between gap-4 rounded-2xl px-3 py-2 lg:px-4 lg:py-3">
      <Image
        src="/images/sugo-coin.png"
        width={72}
        height={72}
        alt=""
        className="aspect-square h-full rounded-md bg-gray-100 object-cover"
      />

      <div className="mr-auto flex flex-col gap-1">
        <p className="text-heading-100 text-xl font-medium">€10 EUR</p>
        <p className="text-sm">17,000 Sugo Coins</p>
        <p className="text-primary mt-1 text-sm">Quantity : 02</p>
      </div>

      <Button variant="ghost" size="icon">
        <Trash2 />
      </Button>
    </div>
  );
}
