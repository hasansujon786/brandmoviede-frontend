import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroGradientWrapper>
        <SectionHeading
          eyebrow="EVENT TICKET"
          description="Grab your tickets for unforgettable live experiences. Limited spots available for our premier annual events."
        >
          Secure Your <span className="text-primary">Exclusive </span> Access
        </SectionHeading>
      </HeroGradientWrapper>
      {children}
    </>
  );
}
