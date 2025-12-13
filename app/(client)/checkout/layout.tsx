"use client";

import CheckoutSummary from "@/components/pages/Checkout/CheckoutSummary";
import { PaymentStatusProvider } from "@/components/pages/Checkout/context/PaymentStatusContext";
import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Stepper, { useNextStep } from "@/components/shared/Stepper/Stepper";

export default function Layout({ children }: React.PropsWithChildren) {
  const { isLast } = useNextStep();

  return (
    <PaymentStatusProvider>
      <div>
        <HeroGradientWrapper>
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
