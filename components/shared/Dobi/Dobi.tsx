"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const dobi = {
  cry: "/images/dobi/cry-dobi.png",
  hey: "/images/dobi/hey-dobi.png",
  kiss: "/images/dobi/kiss-dobi.png",
  music: "/images/dobi/music-dobi.png",
} as const;

interface DobiProps extends React.ComponentProps<"div"> {
  varient: keyof typeof dobi;
}

export default function Dobi({ varient, className, ...props }: DobiProps) {
  return (
    <div
      className={cn("dobi relative size-32 will-change-transform", className)}
      {...props}
    >
      <Image src={dobi[varient]} alt="dobi" fill className="object-contain" />
    </div>
  );
}

export type DobisConfig = DobiProps[];

export function Dobis({ items }: { items: DobisConfig }) {
  useDobiAnimation();

  return (
    <>
      {items.map(({ className, ...conf }, index) => (
        <Dobi
          className={cn("hidden xl:block absolute opacity-0 -z-10", className)}
          key={index}
          {...conf}
        />
      ))}
    </>
  );
}

export function useDobiAnimation() {
  useGSAP(() => {
    const dogs = gsap.utils.toArray<HTMLElement>(".dobi");

    function mouseMove() {
      const handler = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        dogs.forEach((dog, i) => {
          gsap.to(dog, {
            x: x * (i + 1) * 0.2,
            y: y * (i + 1) * 0.2,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      };

      window.addEventListener("mousemove", handler);

      // return () => window.removeEventListener("mousemove", handler);
    }

    // Reset images
    gsap.set(dogs, { opacity: 1 });

    gsap.from(dogs, {
      // delay: 0.1,
      duration: 0.7,
      ease: "power3.out",
      stagger: {
        each: 0.08,
        from: "random",
      },
      opacity: 0,
      scale: 0.9,
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        return rect.left + rect.width / 2 > centerX ? -20 : 20;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        return rect.top + rect.height / 2 > centerY ? -20 : 20;
      },
      onComplete: mouseMove,
    });
  }, []);
}

export function useCardRevealAnimation(scope: string) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const cards = q(".slide-up");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            // opacity: 0,
            y: 50,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.12,
            // delay: (index % 3) * 0.12,
            // delay: index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    },
    {
      // scope: ".coin-grid", // 👈 VERY IMPORTANT
      // dependencies: [data, loading],
    },
  );
}
