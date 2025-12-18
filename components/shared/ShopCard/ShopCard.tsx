import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CounterButton from "../CounterButton/CounterButton";

export default function ShopCard() {
  return (
    <div className="bg-card rounded-2lg p-2">
      <Link
        href="/bundles/bundle-id"
        className="outline-primary block aspect-[0.96010] w-full overflow-hidden rounded-xl bg-red-300 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <Image
          src="/images/sugo-coin.png"
          width={360}
          height={360}
          alt=""
          className="border-card h-full w-full bg-gray-100 object-cover"
        />
      </Link>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-heading-100 text-2xl font-medium">€10 EUR</div>
        <div className="text-body-200 text-lg">17,000 coins</div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-[160px_1fr]">
        <CounterButton />

        <Button
          variant="primary"
          className="bg-primary-50 border-primary-50 text-body-200 hover:bg-primary hover:text-primary-foreground flex-1"
          asChild
        >
          <Link href="/bundles/bundle-id">
            Buy Coins
          </Link>
        </Button>
      </div>
    </div>
  );
}
