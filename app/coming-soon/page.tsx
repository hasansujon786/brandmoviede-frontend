"use client";

import { Dobis, DobisConfig } from "@/components/shared/Dobi/Dobi";
import { useEffect, useState } from "react";

const dobisConfig: DobisConfig = [
  { className: "bottom-1/3 left-20 size-18", varient: "kiss" },
  { className: "top-30 left-1/10 -rotate-35 size-16", varient: "hey" },
  { className: "top-30 right-1/5 rotate-45 size-16", varient: "music" },
  { className: "right-1/3 -bottom-2 rotate-15 size-16", varient: "music" },
  { className: "top-1/2 right-12 -rotate-35 size-16", varient: "cry" },
];

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2026-04-01T00:00:00"); // change this

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#d8a7b1] via-[#c7a6d8] to-[#eae7f2]">
      <Dobis items={dobisConfig} />
      {/* Main Card */}
      <div className="w-full max-w-xl rounded-2xl border border-white/30 bg-white/20 p-10 text-center shadow-xl backdrop-blur-lg">
        {/* Logo */}
        <h1 className="mb-4 text-2xl font-bold tracking-wide">SUGO</h1>

        {/* Badge */}
        <span className="bg-primary mb-4 inline-block rounded-full px-3 py-1 text-xs text-white">
          Coming Soon
        </span>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          We’re Launching Something Amazing 🚀
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-gray-700">
          Our platform is currently under maintenance. We’ll be back shortly
          with a better experience.
        </p>

        {/* Countdown */}
        <div className="mb-6 flex justify-center gap-4">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="w-20 rounded-xl bg-white/30 px-4 py-3">
              <p className="text-xl font-bold text-gray-900">
                {timeLeft[unit] || 0}
              </p>
              <p className="text-xs text-gray-600 capitalize">{unit}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-sm text-gray-600">Stay tuned for updates 👀</p>
      </div>
    </div>
  );
}
