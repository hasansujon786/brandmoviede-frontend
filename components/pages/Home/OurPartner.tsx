import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Image from "next/image";
const partners = [
  "/images/home/partner/partner-0.png",
  "/images/home/partner/partner-1.png",
  "/images/home/partner/partner-2.png",
];

export default function OurPartner() {
  return (
    <section
      className="bg-cover bg-bottom-right bg-no-repeat"
      style={{ backgroundImage: 'url("/images/home/bg-our-partner.png")' }}
    >
      <div className="custom-container flex flex-col items-center gap-6 py-10 sm:p-12 lg:py-20">
        <SectionHeading h2 className="-mt-4">
          Our <span className="text-primary">partner</span>
        </SectionHeading>

        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          {partners.map((item) => (
            <Image
              className="h-12 object-contain sm:first:object-left sm:last:object-right"
              key={item}
              src={item}
              alt=""
              width={200}
              height={200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
