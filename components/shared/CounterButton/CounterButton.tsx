"use client";

import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const CButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "group flex aspect-square h-full items-center justify-center focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "bg-primary group-disabled:bg-primary-200 text-primary-foreground flex size-7 items-center justify-center rounded-full group-hover:bg-[#ff4d77]/90",
          "group-focus-visible:outline-primary group-focus-visible:outline-1 group-focus-visible:outline-offset-2",
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default function CounterButton({
  className,
}: React.ComponentProps<"div">) {
  const [counter, setCounter] = useState(1);
  const increment = () => {
    setCounter((v) => v + 1);
  };

  const decrement = () => {
    setCounter((v) => {
      if (v <= 1) return 1;

      return v - 1;
    });
  };

  return (
    <div
      className={cn(
        "flex w-40 items-center justify-between rounded-[10px] border",
        className,
      )}
    >
      <CButton disabled={counter <= 1} onClick={decrement}>
        <MinusIcon />
      </CButton>

      <span className="text-body-200 text-center text-2xl">{counter}</span>

      <CButton onClick={increment}>
        <PlusIcon />
      </CButton>
    </div>
  );
}
