"use client";

import { createContext, useContext, useState } from "react";

interface StepperContextType {
  step: number;
  pillStep: number;
  setStep: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  MAX_INDEX: number;
  DELAY: number;
}

const StepperContext = createContext<StepperContextType | null>(null);

export function StepperProvider({
  children,
  maxIndex,
  delay = 700,
}: {
  children: React.ReactNode;
  maxIndex: number;
  delay?: number;
}) {
  const [step, _setStep] = useState(
    Number(localStorage.getItem("checkout-step") || 0),
  );
  const [pillStep, setPillStep] = useState(step);

  const nextStep = () => {
    _setStep((v) => {
      if (v >= maxIndex) return maxIndex;

      const newStep = v + 1;
      if (newStep === maxIndex) {
        // If user at the last step then do not persist the steps
        localStorage.removeItem("checkout-step");
      } else {
        localStorage.setItem("checkout-step", newStep.toString());
      }
      setTimeout(() => setPillStep(newStep), delay - 200);

      return newStep;
    });
  };

  const prevStep = () => {
    _setStep((v) => {
      if (v <= 0) return 0;

      const newStep = v - 1;
      localStorage.setItem("checkout-step", newStep.toString());
      setPillStep(newStep);

      return newStep;
    });
  };

  const setStep = (newStep: number) => {
    _setStep(() => {
      localStorage.setItem("checkout-step", newStep.toString());
      setPillStep(newStep);
      return newStep;
    });
  };

  return (
    <StepperContext.Provider
      value={{
        step,
        pillStep,
        prevStep,
        nextStep,
        setStep,
        MAX_INDEX: maxIndex,
        DELAY: delay,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepper() {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("useStepper must be used inside StepperProvider");
  }
  return ctx;
}
