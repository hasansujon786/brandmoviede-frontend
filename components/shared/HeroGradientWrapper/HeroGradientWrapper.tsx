import { cn } from "@/lib/utils";

export default function HeroGradientWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(183deg,#F8C0CC_3.26%,#D7B2F3_90.92%)] pt-12 pb-18",
        className,
      )}
      {...props}
    />
  );
}
