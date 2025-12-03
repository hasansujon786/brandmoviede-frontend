import { cn } from "@/lib/utils";

export default function HeroGradientWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-100 flex-col items-center justify-center bg-[linear-gradient(183deg,#F8C0CC_3.26%,#D7B2F3_90.92%)]",
        className,
      )}
      {...props}
    />
  );
}
