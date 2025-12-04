import { CheckCircle } from "@/components/shared/icons/CheckMark";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SummaryCard from "@/components/shared/SummaryCard/SummaryCard";

export default function BundleDetails() {
  const bundle = {
    price: "€10 EUR",
    coins: "17,000 coins",
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
    main: { title: "Total", value: "€40.99 EUR" },
  };

  return (
    <section className="bg-card rounded-2xl p-8">
      <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-6">
        <Image
          src="/images/sugo-coin.png"
          width={360}
          height={360}
          alt=""
          className="border-card aspect-[0.96010] w-full rounded-lg border bg-gray-100 object-cover"
        />

        <div>
          <h2 className="text-heading-100 text-5xl font-medium">
            {bundle.price}
          </h2>
          <h5 className="text-body-200 mt-3 text-lg">{bundle.coins}</h5>

          <div className="mt-8 flex justify-between gap-6">
            <div>
              <h4 className="text-xl font-medium">What’s Included</h4>
              <ul className="mt-4 flex flex-col gap-1.5">
                {bundle.whatsIncluded.map((item) => (
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
                {bundle.perfectFor.map((item) => (
                  <li className="flex items-center gap-3 text-base" key={item}>
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <p className="text-heading-200 font-heading text-3xl font-semibold">
            Purchase Details
          </p>

          <SummaryCard
            className="bg-primary-50 mt-6 border"
            items={purchaseInfo.items}
            main={purchaseInfo.main}
          >
            <div className="bg-card flex h-14 items-center justify-center rounded-[10px] border">
              <span className="text-body-200 text-center text-2xl">1</span>
            </div>
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
              <Link href="/bundels">View All Bundles</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
