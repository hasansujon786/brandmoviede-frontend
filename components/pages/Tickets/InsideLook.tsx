import GiftboxIcon from "@/components/shared/icons/GiftboxIcon";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import LightBlubIcon from "@/components/shared/icons/LightBlubIcon";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { cn } from "@/lib/utils";

export default function InsideLook() {
  const info = [
    {
      title: "Networking",
      desc: "Connect with fellow Sugo users, creators, and industry professionals",
      icon: <GlobeIcon />,
      bg: "/images/tickets/bg-1.png",
    },
    {
      title: "Learn & Grow",
      desc: "Attend workshops, panels, and keynotes from industry leaders",
      icon: <LightBlubIcon />,
      bg: "/images/tickets/bg-2.png",
    },
    {
      title: "Exclusive Perks",
      desc: "Get swag bags, early access to features, and VIP experiences",
      icon: <GiftboxIcon />,
      bg: "/images/tickets/bg-3.png",
    },
  ];
  return (
    <section className="bg-card py-10 lg:py-20">
      <div className="custom-container">
        <SectionHeading
          h2
          eyebrow="BEYOND THE SCREEN"
          description="Meet the creators, compete in legendary battles, and be the first to see what’s next. This is where the community comes to life."
          descriptionClassName="mt-3 text-xl"
          className="items-start text-left"
        >
          Your Inside Look at <span className="text-primary">Sugo</span> Events
        </SectionHeading>

        <div className="mt-4 grid items-end gap-6 md:grid-cols-3 lg:-mt-6 xl:-mt-12">
          {info.map((item) => (
            <div
              key={item.title}
              style={{ backgroundImage: `url(${item.bg})` }}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-cover bg-bottom bg-no-repeat p-3 md:aspect-[1.11578] lg:aspect-[1.46206] lg:first:aspect-[2.01904] lg:last:aspect-[1.11578] xl:p-4",
              )}
            >
              <div className="absolute inset-0 bg-[#FFCFDA]/40" />
              <div className="relative z-10 flex h-full flex-col">
                {item.icon}

                <h5 className="text-heading-200 mt-8 text-2xl font-semibold md:mt-auto xl:text-3xl">
                  {item.title}
                </h5>
                <p className="mt-2 text-base leading-[132%] xl:text-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
