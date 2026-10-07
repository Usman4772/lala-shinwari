import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (≈30% smaller than WebP for photos), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Qualities that components are allowed to request (default is 75 only).
    qualities: [45, 60, 75],
  },
};

export default nextConfig;
