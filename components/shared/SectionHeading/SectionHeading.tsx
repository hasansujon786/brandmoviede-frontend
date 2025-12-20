"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Pill from "../Pill/Pill";

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  eyebrow?: string; // small top text (optional)
  description?: React.ReactNode; // description under title (optional)
  descriptionClassName?: string;
  h2?: boolean;
  footer?: React.ReactNode;
}

export default function SectionHeading({
  eyebrow,
  description,
  children,
  className,
  descriptionClassName,
  footer,
  h2,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      {eyebrow && <Pill className="slide-up mb-2">{eyebrow}</Pill>}

      {h2 ? (
        <h2 className="slide-up font-heading text-heading-200 text-h2 leading-[132%] font-semibold">
          {children}
        </h2>
      ) : (
        <h1 className="slide-up font-heading text-heading-200 text-h1 leading-[124%] font-extrabold">
          {children}
        </h1>
      )}

      {description && (
        <p
          className={cn(
            "slide-up text-body-200 max-w-2xl leading-[124%]",
            h2 ? "mt-4 text-lg" : "text-body-100 mt-5 text-xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}

      <div className="slide-up w-full">{footer ? footer : null}</div>
    </div>
  );
}
