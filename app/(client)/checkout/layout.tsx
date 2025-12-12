"use client";

import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { STEP_ICONS } from "@/components/shared/Stepper/Stepper";
import { StepperProvider } from "@/components/shared/Stepper/StepperContext";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <StepperProvider maxIndex={STEP_ICONS.length - 1}>
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
        {children}
      </div>
    </StepperProvider>
  );
}
