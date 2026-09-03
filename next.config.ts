import type { NextConfig } from "next";
import { categories } from "./src/config/categories";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...categories.map((category) => ({
        source: `/${category.slug}`,
        destination: `/categories/${category.slug}`,
        permanent: true,
      })),
      {
        source: '/onlyfans-search',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/onlyfans-search/:path*',
        destination: '/search',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.onlyfans.com" },
    ],
    deviceSizes: [240, 360, 480, 640, 720, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 72, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        source: "/:locationSlug([a-z-]+-onlyfans)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=60" },
        ],
      },
      {
        source: "/categories/:slug/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=60" },
        ],
      },
    ];
  },
};

export default nextConfig;
