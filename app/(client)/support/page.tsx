"use client";

import InfoCard from "@/components/shared/InfoCard/InfoCard";
import EmailIcon from "@/components/shared/icons/EmailIcon";
import MessageMoreIcon from "@/components/shared/icons/MessageMoreIcon";
import HeadsetIcon from "@/components/shared/icons/HeadsetIcon";
import PhoneIcon from "@/components/shared/icons/PhoneIcon";
import SupportMessageForm from "../../../components/pages/Support/SupportMessageForm";
import Image from "next/image";
import { FAQ } from "@/components/pages/Bundles/FAQ";
import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { useCardRevealAnimation } from "@/components/shared/Dobi/Dobi";

export default function SupportPage() {
  useCardRevealAnimation(".support-page");
  const infoCards = [
    {
      icon: <EmailIcon className="size-6" />,
      label: "Email Support",
      value: ["support@sugo.com"],
    },
    {
      icon: <MessageMoreIcon className="size-6" />,
      label: "Live Chat",
      value: ["Available 24/7"],
    },
    {
      icon: <PhoneIcon className="size-6" />,
      label: "Phone",
      value: ["1-800-SUGO-HELP"],
    },
    {
      icon: <HeadsetIcon className="size-6" />,
      label: "Email Support",
      value: ["support@sugo.com"],
    },
  ];

  return (
    <div>
      <HeroGradientWrapper>
        <div className="custom-container">
          <SectionHeading
            eyebrow="EVENT TICKET"
            description="Your one-stop destination for help with coins, events, and your account. Everything you need to get back to your experience."
          >
            Sugo <span className="text-primary">Support</span> Center
          </SectionHeading>
        </div>
      </HeroGradientWrapper>

      <div className="support-page slide-scope">
        <section className="py-10 lg:py-20">
          <div className="custom-container grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {infoCards.map((item) => (
              <InfoCard
                className="slide-up"
                variant="light"
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </section>

        <section className="custom-container grid gap-12 py-10 lg:grid-cols-2 lg:py-20">
          <SupportMessageForm />
          <div className="slide-up hidden overflow-hidden rounded-2xl lg:block">
            <Image
              className="h-full w-full object-cover"
              width={648}
              height={730}
              alt=""
              src="/images/bg-support-form.png"
            />
          </div>
        </section>
      </div>

      <FAQ />
    </div>
  );
}
