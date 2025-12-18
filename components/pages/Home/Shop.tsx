import { Pagenation } from "@/components/shared/DataTable/DataTable";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import ShopCard from "@/components/shared/ShopCard/ShopCard";
import { cn } from "@/lib/utils";

interface ShopProps extends React.ComponentProps<"section"> {
  showPagination?: boolean;
}

export default function Shop({ className, showPagination }: ShopProps) {
  return (
    <section className={cn("custom-container py-10 lg:py-20", className)}>
      <SectionHeading
        h2
        eyebrow="SHOP"
        description="Select the perfect bundle to enhance your Sugo Chat experience"
      >
        Sugo <span className="text-primary">Coin</span> Shop
      </SectionHeading>
      <div className="mt-14 grid gap-4 outline md:grid-cols-2 lg:grid-cols-3">
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
      </div>

      {showPagination && (
        <div className="mt-8">
          <Pagenation />
        </div>
      )}
    </section>
  );
}
