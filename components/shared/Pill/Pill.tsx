import { cn } from "@/lib/utils";

interface PillProps {
  variant?: "default" | "green";
}

const gradients: Record<
  NonNullable<PillProps["variant"]>,
  { top: string; inside: string }
> = {
  default: {
    top: "linear-gradient(270deg, #831E34 0%, #E9355C 100%)",
    inside: "linear-gradient(270deg, #E9355C 0%, #831E34 100%)",
  },
  green: {
    top: "linear-gradient(180deg, #0c8b3b 0%, #84fdb1 100%)",
    inside: "linear-gradient(180deg, #84fdb1 0%, #0c8b3b 100%)",
  },
};

export default function Pill({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("pill inline-block h-[30px] rounded-full p-0.5", className)}
      style={{
        backgroundImage:
          "linear-gradient(var(--direction,270deg), var(--g-dark) 0%, var(--g-light) 100%)",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(var(--direction,270deg), var(--g-light) 0%, var(--g-dark) 100%)",
        }}
        className="flex h-full w-full items-center justify-center rounded-full px-2.5"
      >
        <span className="text-primary-foreground text-sm font-light tracking-[3.36px] capitalize">
          {children}
        </span>
      </div>
    </div>
  );
}

const state = {
  REGULAR: {
    class: "pill--purple",
    value: "Regular",
  },
  NEW: {
    class: "pill--green",
    value: "New",
  },
  MOST_POPULAR: {
    class: "pill--red2",
    value: "Most Popular",
  },
};

export function getPillClass(s?: string) {
  if (typeof s !== "string") return null;

  return state[s as keyof typeof state];
}

export type TicketStatus = keyof typeof state;

interface TicketBadgeProps {
  className?: string;
  status?: TicketStatus;
}

export function TicketBadge({ className, status }: TicketBadgeProps) {
  const c = getPillClass(status) ?? state.REGULAR;
  return <Pill className={cn(c.class, className)}>{c.value}</Pill>;
}
