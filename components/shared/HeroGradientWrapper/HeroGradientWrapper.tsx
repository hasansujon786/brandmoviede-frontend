"use client";

import { cn } from "@/lib/utils";
import { useCardRevealAnimation } from "../Dobi/Dobi";

export default function HeroGradientWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  useCardRevealAnimation(".hero-gradient-wrapper");

  return (
    <div
      className={cn(
        "hero-gradient-wrapper slide-scope flex min-h-[512px] flex-col items-center justify-center bg-[linear-gradient(183deg,#F8C0CC_3.26%,#D7B2F3_90.92%)] pt-22",
        className,
      )}
      {...props}
    />
  );
}
