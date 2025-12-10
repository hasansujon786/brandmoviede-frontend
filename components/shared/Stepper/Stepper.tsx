"use client";

import { cn } from "@/lib/utils";
import { CheckMarkDoubleIcon } from "../icons/CheckMark";
import CreditCardIcon from "../icons/CreditCardIcon";
import EmailIcon from "../icons/EmailIcon";
import { useStepper } from "./StepperContext";

export const STEP_ICONS = [EmailIcon, CreditCardIcon, CheckMarkDoubleIcon];

export default function Stepper({
  stepIcons,
}: {
  stepIcons: React.ComponentType<React.ComponentProps<"svg">>[];
}) {
  const { step, pillStep, MAX_INDEX, DELAY, setStep } = useStepper();
  const scaleX = step / MAX_INDEX;

  return (
    <div className="relative flex justify-between">
      <div className="bg-card absolute top-1/2 left-1/2 -z-10 h-4 w-[calc(100%-50px)] -translate-1/2">
        <div
          className="bg-primary absolute top-0 left-0 h-full w-full origin-left rounded-2xl transition-transform ease-in-out"
          style={{
            transform: `scaleX(${scaleX})`,
            transitionDuration: `${DELAY}ms`,
          }}
        />
      </div>

      {stepIcons.map((Icon, index) => {
        const isActive = index <= pillStep;
        const isPreviousPIll = pillStep - 1 === index;

        return (
          <StepperPoint
            disabled={!isPreviousPIll}
            onClick={() => setStep(index)}
            key={index}
            isActive={isActive}
          >
            {/* {String(isPreviousPIll)} */}
            <Icon className="size-6 text-current" />
          </StepperPoint>
        );
      })}
    </div>
  );
}

interface StepperPointProps extends React.ComponentProps<"button"> {
  isActive: boolean;
}

function StepperPoint({
  isActive,
  className,
  children,
  ...props
}: StepperPointProps) {
  return (
    <button
      className={cn(
        "pill inline-block aspect-square h-12 rounded-full p-0.5 text-white not-disabled:cursor-pointer",
        { "pill--white text-black": !isActive },
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--direction,270deg), var(--g-dark) 0%, var(--g-light) 100%)",
      }}
      {...props}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(var(--direction,270deg), var(--g-light) 0%, var(--g-dark) 100%)",
        }}
        className="flex h-full w-full items-center justify-center rounded-full px-2.5"
      >
        {children}
      </div>
    </button>
  );
}
