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

export default function SupportPage() {
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
        <SectionHeading
          eyebrow="EVENT TICKET"
          description="Your one-stop destination for help with coins, events, and your account. Everything you need to get back to your experience."
        >
          Sugo <span className="text-primary">Support</span> Center
        </SectionHeading>
      </HeroGradientWrapper>

      <section className="py-20">
        <div className="custom-container grid grid-cols-4 gap-6">
          {infoCards.map((item) => (
            <InfoCard variant="light" key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="custom-container grid grid-cols-2 gap-12 py-20">
        <SupportMessageForm />
        <div className="overflow-hidden rounded-2xl">
          <Image
            className="h-full w-full object-cover"
            width={648}
            height={730}
            alt=""
            src="/images/bg-support-form.png"
          />
        </div>
      </section>

      <section className="custom-container py-20">
        <FAQ />
      </section>
    </div>
  );
}
