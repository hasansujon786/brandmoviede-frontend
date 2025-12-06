"use client";

import { Button } from "@/components/ui/button";
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
    <div className="bg-card flex flex-col gap-2 rounded-xl p-3">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Button
            className="justify-start px-4 text-right"
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
