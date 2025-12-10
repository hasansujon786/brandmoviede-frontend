import CheckMark from "@/components/shared/icons/CheckMark";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";

const listItems = [
  "First and foremost, we only look at YOU as a person!",
  "We also support you with concerns about blocking or restrictions on your live stream.",
  "We will inform you about the latest regulations or changes on the platform",
];

export default function Benefits() {
  return (
    <section
      className="bg-cover bg-bottom-right bg-no-repeat py-20"
      style={{
        backgroundImage:
          'url("/images/home/benefit-agency/benefit-agency-bg.png")',
      }}
    >
      <div className="custom-container grid grid-cols-2 gap-4">
        <Image
          src="/images/home/benefit-agency/mobile-with-coins.png"
          alt=""
          width={514}
          height={636}
        />

        <div>
          <SectionHeading
            h2
            eyebrow="Your Growth Partner"
            description="We support you from the very beginning to make getting
started with streaming easier."
            descriptionClassName="mt-3 text-xl"
            className="items-start text-left"
          >
            What is the <span className="text-primary">Benefit</span> of an
            Agency?
          </SectionHeading>

          <ul className="mt-4 space-y-2">
            {listItems.map((item) => (
              <li key={item} className="text-body-200 flex text-base">
                <span className="mt-0.5 mr-2">
                  <CheckMark />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button className="mt-12" variant="primary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
