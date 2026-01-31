"use client";

import ConditionalWrapper from "@/components/shared/ConditionalWrapper/ConditionalWrapper";
import {
  EllipsisVertical,
  LogInIcon,
  Menu,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { cn } from "@/lib/utils";
import { useAuth } from "@/redux/features/auth/hooks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RoleUtils } from "@/types";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Coin Bundles", href: "/bundles" },
  { label: "Event Tickets", href: "/tickets" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-100 flex w-full md:top-3 md:px-3 lg:top-4 lg:px-4">
      <div className="bg-primary-50 mx-auto flex w-full items-center justify-between px-4 py-3 text-sm shadow-xs backdrop-blur sm:px-6 md:rounded-xl">
        {/* Logo */}
        <Link
          className="focus-visible:outline-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/"
        >
          <Image width={48} height={48} alt="" src="/images/logo-bl.png" />
        </Link>

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
          <SheetContent className="z-200 bg-[#fff9fc]">
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

  const { isAuthenticated, role } = useAuth();
  const isUser = RoleUtils.isUser(role);

  const actionLinks = isAuthenticated
    ? [
        ...(isUser
          ? [
              {
                label: "Profile",
                href: "/profile",
                icon: <UserRound className="h-5 w-5 text-current" />,
              },
              {
                label: "Cart",
                href: "/cart",
                icon: <ShoppingCart className="h-5 w-5 text-current" />,
              },
            ]
          : []),
        {
          label: "More",
          href: "#",
          component: <MoreActin />,
        },
      ]
    : [
        {
          label: "Sign in",
          href: "/signin",
          icon: <LogInIcon className="h-5 w-5 text-current" />,
        },
      ];

  return (
    <>
      {actionLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        if (link.component) {
          return link.component;
        }

        return (
          <ConditionalWrapper
            key={link.label}
            condition={props.isMobile}
            wrapper={(children) => <SheetClose asChild>{children}</SheetClose>}
          >
            <ActionIcon isActive={isActive} asChild>
              <Link href={link.href}>{link.icon}</Link>
            </ActionIcon>
          </ConditionalWrapper>
        );
      })}
    </>
  );
}

function MoreActin() {
  const { logOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <ActionIcon isActive={false}>
          <EllipsisVertical className="h-6 w-6 text-current" />
        </ActionIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-300">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
