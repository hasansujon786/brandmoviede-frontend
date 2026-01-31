"use client";

import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import CartList from "@/components/pages/Cart/CartList";
import CartSummary from "@/components/pages/Cart/CartSummary";
import { DobisConfig, Dobis } from "@/components/shared/Dobi/Dobi";
import UserRoute from "@/components/auth/UserRoute";

const dobisConfig: DobisConfig = [
  { className: "bottom-8 left-20 size-18 rotate-45", varient: "kiss" },
  { className: "top-30 left-1/10 rotate-45 size-16", varient: "hey" },
  { className: "top-30 right-1/5 -rotate-45 size-16", varient: "hey" },
  { className: "right-1/3 -bottom-6 rotate-15 size-16", varient: "music" },
  { className: "-right-8 -bottom-8 -rotate-45 size-40", varient: "cry" },
];

export default function CartPage() {
  return (
    <UserRoute>
      <div>
        <HeroGradientWrapper>
          <Dobis items={dobisConfig} />

          <div className="custom-container">
            <SectionHeading
              eyebrow="CART"
              description="You're just one step away from owning these limited-edition pieces."
            >
              Your <span className="text-primary">Curated</span> Collection
            </SectionHeading>
          </div>
        </HeroGradientWrapper>

        <section className="custom-container grid gap-8 py-10 lg:grid-cols-2 lg:py-20 xl:gap-12">
          <CartList />
          <CartSummary />
        </section>
      </div>
    </UserRoute>
  );
}
