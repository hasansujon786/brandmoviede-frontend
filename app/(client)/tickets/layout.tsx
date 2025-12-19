import { Dobis, DobisConfig } from "@/components/shared/Dobi/Dobi";
import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

const dobisConfig: DobisConfig = [
  { className: "bottom-8 left-20 size-18 rotate-45", varient: "kiss" },
  { className: "top-30 left-1/10 rotate-45 size-16", varient: "hey" },
  { className: "top-30 right-1/5 -rotate-45 size-16", varient: "hey" },
  { className: "right-1/3 -bottom-6 rotate-15 size-16", varient: "music" },
  { className: "-right-8 -bottom-8 -rotate-45 size-40", varient: "cry" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroGradientWrapper>
        <Dobis items={dobisConfig} />

        <div className="custom-container">
          <SectionHeading
            eyebrow="EVENT TICKET"
            description="Grab your tickets for unforgettable live experiences. Limited spots available for our premier annual events."
          >
            Secure Your <span className="text-primary">Exclusive </span> Access
          </SectionHeading>
        </div>
      </HeroGradientWrapper>
      {children}
    </>
  );
}
