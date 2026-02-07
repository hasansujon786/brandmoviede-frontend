import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#E8C5D8] via-[#D4B5E8] to-[#C5A8D8] p-4">
      <div className="z-10 w-full max-w-2xl text-center">
        {/* Error Code */}
        <div className="mb-6">
          <h1 className="mb-2 text-7xl font-bold text-balance text-[#1a1f4d] md:text-8xl">
            404
          </h1>
          <div className="mb-6 inline-block rounded-full bg-[#E94B7E] px-4 py-2 text-sm font-semibold text-white">
            Page Not Found
          </div>
        </div>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-bold text-balance text-[#1a1f4d] md:text-4xl">
          Oops! You seem lost
        </h2>

        <p className="mb-8 text-lg leading-relaxed text-balance text-[#4a5a7f]">
          The page you&apos;re looking for has drifted into the cosmos.
          Let&apos;s get you back to safety and start your Sugo Coin journey.
        </p>

        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/">
            <Button size="lg" className="" variant="primary">
              Back to Home
            </Button>
          </Link>
          <Link href="/support">
            <Button size="lg" className="">
              Contact Support
            </Button>
          </Link>
        </div>

        <p className="text-sm text-balance text-[#7a7f9f]">
          Error code: 404 • Need help? Check our{" "}
          <Link
            href="/support/#faq"
            className="font-semibold text-[#E94B7E] hover:underline"
          >
            FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}
