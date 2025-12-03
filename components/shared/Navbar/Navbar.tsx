'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { Menu, ShoppingCart, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Coin Bundles', href: '/#bundles' },
    { label: 'Event Tickets', href: '/#tickets' },
    { label: 'Support', href: '/#support' },
]

export default function Navbar() {
    return (
        <header className="w-full bg-[#F8C0CC] px-4 py-4">
            <div className="mx-auto flex w-full  items-center justify-between rounded border border-white/70 bg-white/80 px-4 py-3 text-sm text-gray-800 shadow-lg backdrop-blur sm:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-400 text-lg font-semibold tracking-wide text-gray-800">
                        BL
                    </div>
                    <span className="hidden text-base font-medium text-gray-700 sm:block">B-Link</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link, idx) => (
                        <Button
                            key={link.label}
                            asChild
                            variant={idx === 0 ? 'primary' : 'ghost'}
                            className="px-4 py-2 font-medium"
                        >
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 md:flex">
                    <ActionIcon ariaLabel="Account">
                        <UserRound className="h-5 w-5" />
                    </ActionIcon>
                    <ActionIcon ariaLabel="Cart">
                        <ShoppingCart className="h-5 w-5" />
                    </ActionIcon>
                    <Button variant="primary" className="hidden lg:inline-flex">
                        Launch App
                    </Button>
                </div>

                {/* Mobile trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="flex items-center justify-center md:hidden"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-[#fff9fc]">
                        <SheetHeader>
                            <SheetTitle className="text-gray-900">Navigate Sugo Coin</SheetTitle>
                            <SheetDescription className="text-gray-500">
                                Quick access to every corner of the marketplace.
                            </SheetDescription>
                        </SheetHeader>

                        <nav className="mt-8 flex flex-col gap-3">
                            {navLinks.map((link, idx) => (
                                <SheetClose asChild key={link.label}>
                                    <Button
                                        asChild
                                        variant={idx === 0 ? 'primary' : 'secondary'}
                                        className="justify-between"
                                    >
                                        <Link href={link.href}>
                                            <span>{link.label}</span>
                                        </Link>
                                    </Button>
                                </SheetClose>
                            ))}
                        </nav>

                        <SheetFooter className="pt-8">
                            <div className="flex items-center justify-between rounded-2xl border border-dashed border-gray-200 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Need help?</p>
                                    <p className="text-xs text-gray-500">support@sugo-coin.com</p>
                                </div>
                                <div className="flex gap-2">
                                    <ActionIcon ariaLabel="Account">
                                        <UserRound className="h-5 w-5" />
                                    </ActionIcon>
                                    <ActionIcon ariaLabel="Cart">
                                        <ShoppingCart className="h-5 w-5" />
                                    </ActionIcon>
                                </div>
                            </div>
                            <Button variant="primary" className="w-full">
                                Launch App
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

function ActionIcon({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
    return (
        <Button variant="ghost" size="icon" aria-label={ariaLabel}>
            {children}
        </Button>
    )
}
