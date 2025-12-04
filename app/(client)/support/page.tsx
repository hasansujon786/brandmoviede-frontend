import InfoCard from "@/components/shared/InfoCard/InfoCard";
import EmailIcon from "@/components/shared/icons/EmailIcon";
import MessageMoreIcon from "@/components/shared/icons/MessageMoreIcon";
import HeadsetIcon from "@/components/shared/icons/HeadsetIcon";
import PhoneIcon from "@/components/shared/icons/PhoneIcon";
import SupportMessageForm from "../../../components/pages/Support/SupportMessageForm";
import Image from "next/image";
import { FAQ } from "@/components/pages/Bundles/FAQ";

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
