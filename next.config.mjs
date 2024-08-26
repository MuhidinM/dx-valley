/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['10.1.151.64'],  // added to allow image fetch from strapi
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
