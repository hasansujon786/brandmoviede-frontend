"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/constant";
import { IAppCoinBundle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CounterButton from "../CounterButton/CounterButton";
import { CounterButtonProvider } from "../CounterButton/CounterButtonProvider";
import { formatCurrency, formatPluralNumber } from "@/lib/utils/formatters";

export default function ShopCard({ coin }: { coin: IAppCoinBundle }) {
  return (
    <CounterButtonProvider>
      <div className="bg-card rounded-2lg slide-up p-2">
        <Link
          href={`/bundles/${coin?.id}`}
          className="outline-primary block aspect-[0.96010] w-full overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Image
            src={coin.thumbnail_url}
            width={360}
            height={360}
            alt=""
            unoptimized={config.imageUnoptimized}
            className="border-card h-full w-full bg-gray-100 object-cover"
          />
        </Link>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-heading-100 text-2xl font-medium">
            {formatCurrency(coin?.price ?? 0)}
          </div>
          <div className="text-body-200 text-lg">
            {formatPluralNumber(coin.coin_amount, "coin")}
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-[160px_1fr]">
          <CounterButton />
          <BuyButton />
        </div>
      </div>
    </CounterButtonProvider>
  );
}

function BuyButton() {
  return (
    <Button
      variant="primary"
      className="bg-primary-50 border-primary-50 text-body-200 hover:bg-primary hover:text-primary-foreground flex-1"
      asChild
    >
      <Link href="/bundles/bundle-id">Buy Coins</Link>
    </Button>
  );
}

export function ShopCardSkeleton() {
  return (
    <div className="bg-card rounded-2lg p-2">
      <Skeleton className="aspect-[0.96010] w-full rounded-md" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
