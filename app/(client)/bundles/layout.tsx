import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroGradientWrapper>
        <div className="custom-container">
          <SectionHeading
            eyebrow="SUGO COIN"
            description="Select a ready-made bundle for instant value or create your own custom amount. Get the coins you want, your way."
          >
            Boost Your <span className="text-primary">Coin</span> Balance
          </SectionHeading>
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href='/bundles/custom'>Buy Custom Coin Bundle</Link>
            </Button>
          </div>
        </div>
      </HeroGradientWrapper>
      {children}
    </>
  );
}
