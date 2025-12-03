import Benefits from "@/components/pages/home/Benefits";
import ChooseUs from "@/components/pages/home/ChooseUs";
import Hero from "@/components/pages/home/hero";
import OurPartner from "@/components/pages/home/OurPartner";
import Shop from "@/components/pages/home/shop";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Shop />
      <OurPartner />
      <ChooseUs />
      <Benefits />
    </div>
  );
}
