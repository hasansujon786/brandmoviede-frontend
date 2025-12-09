import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/shared/icons/brandIcons";
import Link from "next/link";

export default function Footer() {
  const socials = [
    { title: "instagram", href: "#", icon: <InstagramIcon /> },
    { title: "facebook", href: "#", icon: <FacebookIcon /> },
    { title: "linkedin", href: "#", icon: <LinkedInIcon /> },
  ];

  const navLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Coin Bundles", href: "/bundles" },
        { label: "Event Tickets", href: "/tickets" },
        { label: "Support", href: "/support" },
      ],
    },

    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/" },
        { label: "Contact Us", href: "/bundles" },
        { label: "FAQs", href: "/tickets" },
      ],
    },
  ];

  const footerLinks = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "GDPR Compliance", href: "/" },
  ];

  return (
    <footer className="bg-footer py-8 md:py-15">
      <div className="custom-container grid gap-6 md:grid-cols-2 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <div className="space-y-6">
          <Image width={200} height={66} alt="" src="/images/logo-full.png" />
          <p className="text-base text-[#A1A1A1]">
            Brand-Light was founded in September 2023. Light and Zebra have made
            it their mission to make streaming easier for people on all
            platforms (e.g. Tik Tok, Sugo) and to support them with advice and
            assistance
          </p>
          <div className="flex items-center gap-4">
            {socials.map((item) => (
              <Button key={item.title} asChild size="icon" variant="primary">
                <Link href={item.href}>{item.icon}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2">
          {navLinks.map((item) => (
            <div key={item.title}>
              <p className="font-heading text-2xl text-white">{item.title}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-[#A5A5AB] hover:underline"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="custom-container">
        <div className="mt-8 flex h-16 items-center justify-between border-t border-white/10">
          <p>© 2025 Brand Light. All rights reserved.</p>

          <div className="flex gap-6">
            {footerLinks.map((item) => (
              <Link key={item.title} href={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
