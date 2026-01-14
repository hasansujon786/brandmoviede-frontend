import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.42:4008", // এখানে আপনার ইমেজের ডোমেইন দিবেন
        // Optional: You can also use a wildcard for the pathname
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
