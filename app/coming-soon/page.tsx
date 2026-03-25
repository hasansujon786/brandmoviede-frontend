import { Dobis, DobisConfig } from "@/components/shared/Dobi/Dobi";

const dobisConfig: DobisConfig = [
  { className: "bottom-1/3 left-20 size-18", varient: "kiss" },
  { className: "top-30 left-1/10 -rotate-35 size-16", varient: "hey" },
  { className: "top-30 right-1/5 rotate-45 size-16", varient: "music" },
  { className: "right-1/3 -bottom-2 rotate-15 size-16", varient: "music" },
  { className: "top-1/2 right-12 -rotate-35 size-16", varient: "cry" },
];

export default function ComingSoonPage() {
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
          We’re Launching Something{" "}
          <span className="text-primary">Amazing</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-6 max-w-sm text-center text-gray-700">
          Our platform is currently under maintenance. We’ll be back shortly
          with a better experience.
        </p>

        {/* Countdown */}
        <p className="animation-duration-[2s] animate-bounce text-5xl"> 🚀</p>

        {/* Footer note */}
        <p className="text-sm text-gray-600">Stay tuned for updates</p>
      </div>
    </div>
  );
}
