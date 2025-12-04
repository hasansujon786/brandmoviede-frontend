"use client";

import ArrowRight from "@/components/shared/icons/Arrow";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavigationLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// TODO: hight light color perfectly
export default function NavigationLink({
  className,
  children,
  href = "#",
  ...props
}: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-primary focus-visible:outline-ring inline-flex items-center gap-2 border-b border-current px-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <ArrowRight />
      <span className="text-sm">{children}</span>
    </Link>
  );
}
