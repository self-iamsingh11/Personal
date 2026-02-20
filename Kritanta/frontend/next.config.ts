import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.yoursite.com',
      },
      {
        protocol: 'https',
        hostname: 'images.yoursite.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
