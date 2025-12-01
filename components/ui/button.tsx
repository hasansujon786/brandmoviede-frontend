import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60"

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-secondary text-foreground hover:bg-secondary/80 focus-visible:outline-ring",
  primary:
    "bg-[#ff4d77] text-white shadow-sm hover:bg-[#ff4d77]/90 focus-visible:outline-[#ff4d77]",
  secondary:
    "bg-white text-gray-700 shadow hover:text-gray-900 focus-visible:outline-ring",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline-ring",
  outline:
    "border border-input bg-background hover:bg-gray-50 focus-visible:outline-ring",
  link: "text-[#ff4d77] underline-offset-4 hover:underline focus-visible:outline-ring",
}

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-11 px-5",
  sm: "h-9 px-4 text-xs",
  lg: "h-12 px-6 text-base",
  icon: "h-11 w-11",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(baseStyles, variants[variant] ?? variants.default, sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button }
