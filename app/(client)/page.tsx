import Benefits from "@/components/pages/Home/Benefits";
import ChooseUs from "@/components/pages/Home/ChooseUs";
import Hero from "@/components/pages/Home/Hero";
import OurPartner from "@/components/pages/Home/OurPartner";
import Shop from "@/components/pages/Home/Shop";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Shop  />
      <OurPartner />
      <ChooseUs />
      <Benefits />
    </div>
  );
}
