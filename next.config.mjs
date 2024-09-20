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
        hostname: "10.1.151.64",
      },
      {
        protocol: "https",
        hostname: "10.101.200.124",
      },
    ],
  },
};

export default nextConfig;
