"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Adjust this union to match your real payment states
 */
export type PaymentStatus = "idle" | "pending" | "success" | "failed" | null;

interface PaymentStatusContextType {
  status: PaymentStatus;
  setStatus: (status: PaymentStatus) => void;
  resetStatus: () => void;
}

const PaymentStatusContext = createContext<PaymentStatusContextType | null>(
  null,
);

export function PaymentStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<PaymentStatus>(null);

  const resetStatus = () => setStatus(null);

  return (
    <PaymentStatusContext.Provider value={{ status, setStatus, resetStatus }}>
      {children}
    </PaymentStatusContext.Provider>
  );
}

export function usePaymentStatus() {
  const ctx = useContext(PaymentStatusContext);
  if (!ctx) {
    throw new Error(
      "usePaymentStatus must be used inside PaymentStatusProvider",
    );
  }
  return ctx;
}
