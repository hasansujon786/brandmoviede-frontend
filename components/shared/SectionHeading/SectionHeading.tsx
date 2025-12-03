import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  eyebrow?: string; // small top text (optional)
  description?: React.ReactNode; // description under title (optional)
  descriptionClassName?: string;
  h2?: boolean;
}

export default function SectionHeading({
  eyebrow,
  description,
  children,
  className,
  descriptionClassName,
  h2,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      {eyebrow && (
        <div
          className="h-[30px] rounded-full p-0.5"
          style={{
            backgroundImage:
              "linear-gradient(270deg, #831E34 0%, #E9355C 100%)",
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(270deg, #E9355C 0%, #831E34 100%)",
            }}
            className="flex h-full w-full items-center justify-center rounded-full px-2.5"
          >
            <span className="text-primary-foreground text-sm font-light tracking-[3.36px] capitalize">
              {eyebrow}
            </span>
          </div>
        </div>
      )}

      {h2 ? (
        <h2 className="font-heading text-heading-200 mt-2 text-5xl leading-[132%] font-semibold">
          {children}
        </h2>
      ) : (
        <h1 className="font-heading text-heading-200 mt-2 text-7xl leading-[124%] font-extrabold">
          {children}
        </h1>
      )}

      {description && (
        <p
          className={cn(
            "text-body-200 max-w-2xl leading-[124%]",
            h2 ? "mt-4 text-lg" : "text-body-100 mt-5 text-xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
