import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import CartList from "@/components/pages/Cart/CartList";
import CartSummary from "@/components/pages/Cart/CartSummary";

export default function CartPage() {
  return (
    <div>
      <HeroGradientWrapper>
        <SectionHeading
          eyebrow="CART"
          description="You're just one step away from owning these limited-edition pieces."
        >
          Your <span className="text-primary">Curated</span> Collection
        </SectionHeading>
      </HeroGradientWrapper>

      <section className="custom-container grid grid-cols-2 gap-12 py-20">
        <CartList />
        <CartSummary />
      </section>
    </div>
  );
}
