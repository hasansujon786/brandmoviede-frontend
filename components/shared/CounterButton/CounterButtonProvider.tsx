"use client";

import React, { createContext, useContext, useState } from "react";

interface CounterContextValue {
  counter: number;
  increment: () => void;
  decrement: () => void;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const CounterContext = createContext<CounterContextValue | null>(null);

export function CounterButtonProvider({
  children,
  initialValue = 1,
}: {
  children: React.ReactNode;
  initialValue?: number;
}) {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => setCounter((v) => v + 1);

  const decrement = () => setCounter((v) => (v <= 1 ? 1 : v - 1));

  return (
    <CounterContext.Provider
      value={{ counter, increment, decrement, setCounter }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounterButton() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
}
