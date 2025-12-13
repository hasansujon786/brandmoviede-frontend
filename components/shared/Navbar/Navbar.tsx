"use client";

import Link from "next/link";
import { Menu, ShoppingCart, UserRound } from "lucide-react";
import ConditionalWrapper from "@/components/shared/ConditionalWrapper/ConditionalWrapper";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Coin Bundles", href: "/bundles" },
  { label: "Event Tickets", href: "/tickets" },
  { label: "Support", href: "/support" },
];

const actionLinks = [
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-100 flex w-full md:top-3 md:px-3 lg:top-4 lg:px-4">
      <div className="bg-primary-50 mx-auto flex w-full items-center justify-between px-4 py-3 text-sm shadow-xs backdrop-blur sm:px-6 md:rounded-xl">
        {/* Logo */}
        <Image width={48} height={48} alt="" src="/images/logo-bl.png" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href == pathname;
            return (
              <Button
                size="sm"
                key={link.label}
                asChild
                variant={isActive ? "primary" : "ghost"}
                className="h-9.5 rounded-2xl px-4 py-1 text-lg font-medium"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ActionIcons isMobile={false} />
        </div>

        {/* Mobile trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#fff9fc] z-200">
            <SheetHeader>
              <SheetTitle className="text-gray-900">
                Navigate Sugo Coin
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Quick access to every corner of the marketplace.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-3 px-4">
              {navLinks.map((link) => {
                const isActive = link.href == pathname;
                return (
                  <SheetClose asChild key={link.label}>
                    <Button
                      asChild
                      variant={isActive ? "primary" : "secondary"}
                      className="justify-between shadow"
                    >
                      <Link href={link.href}>
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  </SheetClose>
                );
              })}
            </nav>

            <SheetFooter className="pt-8">
              <div className="border-body-200/30 flex items-center justify-between rounded-2xl border border-dashed px-4 py-3">
                <div>
                  <p className="text-heading-100 text-sm font-medium">
                    Need help?
                  </p>
                  <p className="text-body-200 text-xs">support@sugo-coin.com</p>
                </div>

                <div className="flex gap-2">
                  <ActionIcons isMobile />
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function ActionIcon({
  isActive,
  ...props
}: React.ComponentProps<typeof Button> & { isActive: boolean }) {
  return (
    <Button
      className={cn({
        "border-primary text-white": isActive,
      })}
      variant={isActive ? "primary" : "ghost"}
      size="icon"
      {...props}
    />
  );
}

function ActionIcons(props: { isMobile: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {actionLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <ConditionalWrapper
            key={link.label}
            condition={props.isMobile}
            wrapper={(children) => <SheetClose asChild>{children}</SheetClose>}
          >
            <ActionIcon isActive={isActive} asChild aria-label="Cart">
              <Link href={link.href}>
                <link.icon className="h-5 w-5 text-current" />
              </Link>
            </ActionIcon>
          </ConditionalWrapper>
        );
      })}
    </>
  );
}
