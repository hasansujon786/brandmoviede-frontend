"use client";

import { Dobis, DobisConfig } from "@/components/shared/Dobi/Dobi";
import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dobisConfig: DobisConfig = [
  { className: "bottom-8 left-20 size-18 rotate-45", varient: "kiss" },
  { className: "top-30 left-1/10 rotate-45 size-16", varient: "hey" },
  { className: "top-30 right-1/5 -rotate-45 size-16", varient: "hey" },
  { className: "right-1/3 -bottom-6 rotate-15 size-16", varient: "music" },
  { className: "-right-8 -bottom-8 -rotate-45 size-40", varient: "cry" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <HeroGradientWrapper>
        <Dobis items={dobisConfig} />

        <div className="custom-container">
          <SectionHeading
            className=""
            eyebrow="SUGO COIN"
            description="Select a ready-made bundle for instant value or create your own custom amount. Get the coins you want, your way."
            footer={<HeadingFooter pathname={pathname} />}
          >
            Boost Your <span className="text-primary">Coin</span> Balance
          </SectionHeading>
        </div>
      </HeroGradientWrapper>
      {children}
    </>
  );
}

const HeadingFooter = ({ pathname }: { pathname: string }) => {
  return (
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
  );
};
