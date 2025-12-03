import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import ShopCard from "@/components/shared/ShopCard/ShopCard";
import { Button } from "@/components/ui/button";

export default function Shop() {
  return (
    <section className="custom-container">
      <SectionHeading
        h2
        eyebrow="SHOP"
        description="Select the perfect bundle to enhance your Sugo Chat experience"
      >
        Sugo <span className="text-primary">Coin</span> Shop
      </SectionHeading>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
      </div>
    </section>
  );
}
