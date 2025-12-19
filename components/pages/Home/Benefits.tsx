"use client";

import CheckMark from "@/components/shared/icons/CheckMark";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { useCardRevealAnimation } from "@/components/shared/Dobi/Dobi";

const listItems = [
  "First and foremost, we only look at YOU as a person!",
  "We also support you with concerns about blocking or restrictions on your live stream.",
  "We will inform you about the latest regulations or changes on the platform",
];

export default function Benefits() {
  useCardRevealAnimation(".benefits");
  return (
    <section
      className="benefits slide-scope bg-cover bg-bottom-right bg-no-repeat py-20"
      style={{
        backgroundImage:
          'url("/images/home/benefit-agency/benefit-agency-bg.png")',
      }}
    >
      <div className="custom-container grid gap-4 lg:grid-cols-2">
        <div className="slide-up flex items-start justify-center lg:justify-start">
          <Image
            src="/images/home/benefit-agency/mobile-with-coins.png"
            alt=""
            width={514}
            height={636}
          />
        </div>

        <div>
          <SectionHeading
            h2
            eyebrow="Your Growth Partner"
            description="We support you from the very beginning to make getting
started with streaming easier."
            descriptionClassName="mt-3 text-xl max-w-full"
            className="items-start text-left"
          >
            What is the <span className="text-primary">Benefit</span> of an
            Agency?
          </SectionHeading>

          <ul className="mt-4 space-y-2">
            {listItems.map((item) => (
              <li key={item} className="slide-up text-body-200 flex text-base">
                <span className="mt-0.5 mr-2">
                  <CheckMark />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button className="slide-up mt-12 w-full sm:w-auto" variant="primary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
