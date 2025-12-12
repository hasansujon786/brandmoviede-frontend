"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Dashboard", href: "/profile" },
  { label: "Order History", href: "/profile/order-history" },
  { label: "My Tickets", href: "/profile/my-tickets" },
  { label: "Profile Settings", href: "/profile/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="lg:bg-card flex gap-3 overflow-x-scroll p-3 lg:flex-col lg:gap-2 lg:overflow-x-auto lg:rounded-xl">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Button
            className={cn(
              "h-10 justify-start rounded-full px-4 text-right text-base lg:h-14 lg:rounded-[10px] lg:text-lg",
              {
                "bg-card": !isActive,
              },
            )}
            variant={isActive ? "primary" : "ghost"}
            asChild
            key={link.label}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
