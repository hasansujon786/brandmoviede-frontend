import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.42",
        port: "4008",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4008",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
