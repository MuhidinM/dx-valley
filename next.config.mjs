/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //domains: ['10.1.151.64'],  // added to allow image fetch from strapi
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
