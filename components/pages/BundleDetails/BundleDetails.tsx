"use client";

import CounterButton from "@/components/shared/CounterButton/CounterButton";
import {
  CounterButtonProvider,
  useCounterButton,
} from "@/components/shared/CounterButton/CounterButtonProvider";
import { CheckCircle } from "@/components/shared/icons/CheckMark";
import NavigationLink from "@/components/shared/NavigationLink/NavigationLink";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils/formatters";
import { useGetSingleCoinBundleByIdQuery } from "@/redux/api";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BundleDetails() {
  return (
    <CounterButtonProvider>
      <BundleDetailsContent />
    </CounterButtonProvider>
  );
}

function BundleDetailsContent() {
  const { bundleId } = useParams<{ bundleId: string }>();

  const { data: bundle, isLoading } = useGetSingleCoinBundleByIdQuery(bundleId);
  const price = bundle?.price ?? 0;
  const { counter } = useCounterButton();

  const moreInfo = {
    whatsIncluded: [
      "Great value",
      "Instants delivery",
      "Priority email support",
      "Never expires",
      "5% bonus coins",
    ],
    perfectFor: [
      "Never expires",
      "Premium content access",
      "Multiple theme unlocks",
      "Event participation",
    ],
  };

  const purchaseInfo = {
    items: [
      { title: "Subtotal", value: "€40 EUR" },
      { title: "Tax", value: "€0.90 EUR" },
    ],
  };

  return (
    <section className="bg-card rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] xl:grid-cols-[1fr_1.2fr_1fr]">
        <Image
          unoptimized
          src={bundle?.thumbnail_url as string}
          width={360}
          height={360}
          alt=""
          className="border-card aspect-[0.96010] w-full rounded-lg border bg-gray-100 object-cover"
        />

        <div>
          {isLoading ? (
            <Skeleton className="h-12 w-[150px]" />
          ) : (
            <h2 className="text-heading-100 text-h2 font-medium">
              {formatCurrency(price)}
            </h2>
          )}

          {isLoading ? (
            <Skeleton className="mt-3 h-7 w-20" />
          ) : (
            <h5 className="text-body-200 mt-3 text-lg">
              {bundle?.coin_amount} coins
            </h5>
          )}

          <div className="mt-4 flex flex-col gap-6 sm:flex-row md:mt-8 xl:justify-between">
            <div>
              <h4 className="text-xl font-medium">What’s Included</h4>
              <ul className="mt-4 flex flex-col gap-1.5">
                {moreInfo.whatsIncluded.map((item) => (
                  <li className="flex items-center gap-3 text-base" key={item}>
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-medium">Perfect For</h4>
              <ul className="mt-4 flex flex-col gap-2">
                {moreInfo.perfectFor.map((item) => (
                  <li className="flex items-center gap-3 text-base" key={item}>
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-full xl:col-auto">
          <p className="text-heading-200 font-heading text-3xl font-semibold">
            Purchase Details
          </p>

          <SummaryCard
            className="bg-primary-50 mt-6 border"
            main={{
              title: "Total",
              value: formatCurrency(price * counter),
            }}
          >
            <CounterButton className="bg-card h-14 w-full" />
          </SummaryCard>

          <div className="mt-8 space-y-2">
            <Button className="w-full" variant="primary">
              Add to Cart
            </Button>

            <Button
              asChild
              className="text-foreground h-8 w-full font-normal"
              variant="link"
            >
              <Link href="/bundles">View All Bundles</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShowBackButton() {
  const router = useRouter();
  return (
    <NavigationLink onClick={router.back} href="#">
      Coin Bundle / Bundle Details
    </NavigationLink>
  );
}
