"use client";

import { Pagenation } from "@/components/shared/DataTable/DataTable";
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from "@/components/shared/DataTable/PaginationPageProvider";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import ShopCard, {
  ShopCardSkeleton,
} from "@/components/shared/ShopCard/ShopCard";
import { cn } from "@/lib/utils";
import { useGetAllCoinBundlesQuery } from "@/redux/api";

interface ShopProps extends React.ComponentProps<"section"> {
  showPagination?: boolean;
}

export default function Shop(props: ShopProps) {
  return (
    <PaginationPageProvider>
      <ShopContent {...props} />;
    </PaginationPageProvider>
  );
}

function ShopContent({ className, showPagination }: ShopProps) {
  // useCardRevealAnimation(".shop");
  const { page } = usePaginationPage();
  const { data, isLoading } = useGetAllCoinBundlesQuery({
    page,
    limit: showPagination ? 12 : 6,
  });
  usePaginatedQuery(data);

  const coinBundles = data?.data || [];

  return (
    <section
      className={cn(
        "shop _slide-scope custom-container py-10 lg:py-20",
        className,
      )}
    >
      <SectionHeading
        h2
        eyebrow="SHOP"
        description="Select the perfect bundle to enhance your Sugo Chat experience"
        className="slide-up"
      >
        Sugo <span className="text-primary">Coin</span> Shop
      </SectionHeading>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ShopCardSkeleton key={index} />
            ))
          : Array.isArray(coinBundles)
            ? coinBundles?.map((coinBundle) => (
                <ShopCard coin={coinBundle} key={coinBundle.id} />
              ))
            : null}
      </div>

      {showPagination && (
        <div className="mt-8">
          <Pagenation />
        </div>
      )}
    </section>
  );
}
