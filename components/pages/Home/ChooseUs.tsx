import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const icons = [
  {
    title: "Choose Product",
    desc: "Browse our curated selection of coin bundles or exclusive event tickets tailored to your needs",
    icon: "/images/home/lock.svg",
  },
  {
    title: "Secure Checkout",
    desc: "Complete your purchase with confidence using our bank-level encrypted payment system",
    icon: "/images/home/sheild.svg",
  },
  {
    title: "Instant Delivery",
    desc: "Receive your unique redemption code via email instantly – no waiting, no hassle",
    icon: "/images/home/O.svg",
  },
];

export default function ChooseUs() {
  return (
    <section className="py-20">
      <div className="custom-container grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            h2
            eyebrow="Your Best Choice"
            description="Secure instant access to a versatile digital asset engineered for seamless blockchain transactions, exclusive ecosystem utility, and empowering your position within the decentralized landscape your reliable gateway to digital asset liquidity and growth."
            descriptionClassName="mt-3 text-xl max-w-full"
            className="items-start text-left"
          >
            Why <span className="text-primary">Choose</span> Us?
          </SectionHeading>

          <Button className="mt-12 w-full sm:w-auto" variant="primary">
            Learn More
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {icons.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-4 px-4 py-5 first:col-span-full lg:flex-row lg:items-start"
            >
              <Image
                className="aspect-square w-20"
                width={300}
                height={300}
                src={item.icon}
                alt=""
              />
              <div className="max-w-md text-center lg:text-left">
                <p className="text-heading-100 text-2xl font-bold">
                  {item.title}
                </p>
                <p className="text-body-200">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
