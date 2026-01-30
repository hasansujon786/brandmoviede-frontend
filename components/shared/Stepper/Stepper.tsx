"use client";

import { usePaymentStatus } from "@/components/pages/Checkout/context/PaymentStatusContext";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CheckMarkDoubleIcon } from "../icons/CheckMark";
import CreditCardIcon from "../icons/CreditCardIcon";
import EmailIcon from "../icons/EmailIcon";

const steps = [
  { label: "Checkout", path: "/checkout", icon: EmailIcon },
  { label: "Payment", path: "/checkout/payment", icon: CreditCardIcon },
  { label: "Result", path: "/checkout/result", icon: CheckMarkDoubleIcon },
];

export const STEP_ICONS = [EmailIcon, CreditCardIcon, CheckMarkDoubleIcon];
const DELAY = 700; // ms

export const useNextStep = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = steps.findIndex((s) => s.path === pathname);

  const goNext = (queryParams = "") => {
    if (activeIndex === -1) return;

    const next = steps[activeIndex + 1];
    if (!next) return;

    router.push(`${next.path}${queryParams}`);
  };

  return { goNext, activeIndex, isLast: activeIndex === steps.length - 1 };
};

export default function Stepper() {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = steps.findIndex((s) => s.path === pathname);
  const safeIndex = Math.max(0, activeIndex);

  const [activePillIndex, setActivePillIndex] = useState(safeIndex);
  const scaleX = safeIndex / (steps.length - 1);

  const prevIndexRef = useRef(safeIndex);

  useEffect(() => {
    const prev = prevIndexRef.current;
    prevIndexRef.current = safeIndex;

    // moving forward → delay
    // moving backward → update immediately
    const delay = safeIndex > prev ? DELAY - 200 : 0;
    const t = setTimeout(() => setActivePillIndex(safeIndex), delay);
    return () => clearTimeout(t);
  }, [safeIndex]);

  const { isLast } = useNextStep();
  const { status } = usePaymentStatus();
  if (isLast && (status === "success" || status === "failed")) {
    return null;
  }

  return (
    <section className="custom-container mt-10 lg:mt-20">
      <div className="relative flex justify-between">
        {/* Progress bar */}
        <div className="bg-card absolute top-1/2 left-1/2 -z-10 h-4 w-[calc(100%-50px)] -translate-1/2">
          <div
            className="bg-primary absolute inset-0 origin-left rounded-2xl transition-transform"
            style={{
              transform: `scaleX(${scaleX})`,
              transitionDuration: `${DELAY}ms`,
            }}
          />
        </div>

        {steps.map(({ icon: Icon, path }, index) => {
          const isActive = index <= activePillIndex;
          const isClickable = index === activePillIndex - 1;

          return (
            <StepperPoint
              key={path}
              isActive={isActive}
              disabled={!isClickable}
              onClick={() => isClickable && router.push(path)}
            >
              <Icon className="size-6" />
            </StepperPoint>
          );
        })}
      </div>
    </section>
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
