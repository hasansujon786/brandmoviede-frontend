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
      className="mt-20 bg-cover bg-bottom-right bg-no-repeat pb-20 pt-10"
      style={{ backgroundImage: 'url("/images/home/bg-our-partner.png")' }}
    >
      <div className="custom-container">
        <SectionHeading h2>
          Our <span className="text-primary">partner</span>
        </SectionHeading>
        <div className="flex items-center mt-8 justify-between">
          {partners.map((item) => (
            <Image
              className="h-12 object-contain first:object-left last:object-right"
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
