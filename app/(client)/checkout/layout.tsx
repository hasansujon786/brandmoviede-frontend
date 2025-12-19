"use client";

import CheckoutSummary from "@/components/pages/Checkout/CheckoutSummary";
import { PaymentStatusProvider } from "@/components/pages/Checkout/context/PaymentStatusContext";
import { Dobis, DobisConfig } from "@/components/shared/Dobi/Dobi";
import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Stepper, { useNextStep } from "@/components/shared/Stepper/Stepper";

const dobisConfig: DobisConfig = [
  { className: "bottom-8 left-20 size-18 rotate-45", varient: "kiss" },
  { className: "top-30 left-1/10 rotate-45 size-16", varient: "hey" },
  { className: "top-30 right-1/5 -rotate-45 size-16", varient: "hey" },
  { className: "right-1/3 -bottom-6 rotate-15 size-16", varient: "music" },
  { className: "-right-8 -bottom-8 -rotate-45 size-40", varient: "cry" },
];

export default function Layout({ children }: React.PropsWithChildren) {
  const { isLast } = useNextStep();

  return (
    <PaymentStatusProvider>
      <div>
        <HeroGradientWrapper>
          <Dobis items={dobisConfig} />
          <div className="custom-container">
            <SectionHeading
              eyebrow="CHECKOUT"
              description="Review your order and complete payment to own these limited-edition pieces forever."
              descriptionClassName="max-w-auto"
            >
              Finalize Your <span className="text-primary">Purchase</span>
            </SectionHeading>
          </div>
        </HeroGradientWrapper>

        <div className="min-h-screen">
          <Stepper />

          {isLast ? (
            children
          ) : (
            <section className="custom-container grid gap-8 py-10 lg:grid-cols-2 lg:py-20 xl:gap-12">
              {children}
              <CheckoutSummary />
            </section>
          )}
        </div>
      </div>
    </PaymentStatusProvider>
  );
}
