"use client";

import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <HeroGradientWrapper className="">
        <div className="custom-container">
          <SectionHeading
            className=""
            eyebrow="SUGO COIN"
            description="Select a ready-made bundle for instant value or create your own custom amount. Get the coins you want, your way."
          >
            Boost Your <span className="text-primary">Coin</span> Balance
          </SectionHeading>

          <div
            className={cn(
              "mt-12 flex w-full flex-col justify-center gap-4 sm:flex-row sm:items-center",
              { hidden: pathname === "/bundles/custom" },
            )}
          >
            <Button variant="primary" asChild>
              <Link href="/bundles/custom">Buy Custom Coin Bundle</Link>
            </Button>
          </div>
        </div>
      </HeroGradientWrapper>
      {children}
    </>
  );
}
