import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface InfoCardProps extends React.ComponentProps<"div"> {
  isLoading?: boolean;
  icon: React.JSX.Element;
  label: string;
  value: (string | number)[];
  variant?: "light" | "default";
}

const variants: Record<
  NonNullable<InfoCardProps["variant"]>,
  { wrapper: string; icon: string }
> = {
  default: {
    wrapper: "bg-primary-100 border-primary/10",
    icon: "bg-background-lighten text-primary",
  },
  light: {
    wrapper: "bg-card border-input",
    icon: "bg-primary-100 text-primary",
  },
};

export default function InfoCard({
  icon,
  label,
  value,
  isLoading,
  variant = "default",
  className,
  ...props
}: InfoCardProps) {
  const c = variants[variant] ?? variants.default;

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border px-4 py-8 text-center",
        c.wrapper,
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center rounded-full lg:size-14",
          c.icon,
        )}
      >
        {icon}
      </div>

      <h6 className="text-heading-200 font-heading mt-4 font-semibold md:text-xl lg:mt-6 lg:text-2xl">
        {label}
      </h6>
      {isLoading ? (
        <Skeleton className="mt-1 h-6 w-12" />
      ) : (
        value.map((v, index) => (
          <p key={index} className="mt-1 max-w-xs px-2 text-base">
            {v}
          </p>
        ))
      )}
    </div>
  );
}
