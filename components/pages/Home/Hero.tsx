import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
// fix name
export default function Hero() {
  return (
    <section
      className="pt-48 pb-78"
      style={{
        background:
          "linear-gradient(180deg, #F8C0CC 3.26%, #D7B2F3 80.92%, var(--background) 100%)",
      }}
    >
      <div className="custom-container pt-22">
        <SectionHeading
          eyebrow="SUGO COIN"
          description="Purchase coin bundles for in-app use or secure your tickets for our exclusive annual events. Simple, fast, and reliable."
        >
          Fuel Your <span className="text-primary">Sugo</span> Coin <br />{" "}
          Experience
        </SectionHeading>
        <div className="mt-16 flex items-center justify-center gap-4">
          <Button variant="primary">Buy Coins</Button>
          <Button>Get Tickets</Button>
        </div>
      </div>
    </section>
  );
}
