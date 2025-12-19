"use client";
import { Dobies, useCardRevealAnimation } from "@/components/shared/Dobi/Dobi";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";

export default function Hero() {
  useCardRevealAnimation(".hero");

  return (
    <section
      className="hero slide-scope relative -z-20 pt-6 pb-20 sm:pb-24 md:pt-48 md:pb-78"
      style={{
        background:
          "linear-gradient(180deg, #F8C0CC 3.26%, #D7B2F3 80.92%, var(--background) 100%)",
      }}
    >
      <Dobies
        items={[
          { className: "top-40 left-40 rotate-35", varient: "music" },
          { className: "top-1/2 left-20 size-18 -rotate-45", varient: "kiss" },
          { className: "bottom-30 left-50 -rotate-35", varient: "cry" },
          { className: "top-30 left-[45%] -rotate-45 size-16", varient: "hey" },
          { className: "top-30 right-30 rotate-45", varient: "kiss" },
          {
            className: "right-20 bottom-1/2 -rotate-45 size-12",
            varient: "cry",
          },
          {
            className: "right-20 bottom-20 rotate-45 transform",
            varient: "hey",
          },
        ]}
      />

      <div className="custom-container pt-22">
        <SectionHeading
          eyebrow="SUGO COIN"
          description="Purchase coin bundles for in-app use or secure your tickets for our exclusive annual events. Simple, fast, and reliable."
          footer={<HeadingFooter />}
        >
          Fuel Your <span className="text-primary">Sugo</span> Coin <br />{" "}
          Experience
        </SectionHeading>
      </div>
    </section>
  );
}

const HeadingFooter = () => {
  return (
    <div className="mt-16 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
      <Button variant="primary">Buy Coins</Button>
      <Button>Get Tickets</Button>
    </div>
  );
};
