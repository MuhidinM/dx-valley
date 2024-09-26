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
  async rewrites() {
    return [
      {
        source: "/newapi/:path*", // custom path you want
        destination: "/api/:path*", // points to the actual /api endpoint
      },
    ];
  },
};

export default nextConfig;
