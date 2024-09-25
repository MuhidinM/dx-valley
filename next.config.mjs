/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_STRAPI_IP_64,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_IP,
      },
    ],
  },
};

export default nextConfig;
