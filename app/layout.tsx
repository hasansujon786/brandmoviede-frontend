import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import "./globals.css";

import { TwScreenSize } from "@/components/ui/tw-utils";
import StoreProvider from "@/redux/StoreProvider";
import AuthProvider from "@/redux/features/auth/AuthProvider";
import { Toaster } from "sonner";

const interTight = Inter_Tight({
  variable: "--font-inter-tight-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sugo Coin",
  description:
    "Buy Sugo Coins to unlock premium features, exclusive content, themes, and event access. Instant delivery, bonus coins, and lifetime validity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.className} ${bricolageGrotesque.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
        <TwScreenSize />
        <Toaster />
      </body>
    </html>
  );
}
