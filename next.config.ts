import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'topemporda.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Afegir aquí redireccions si migreu contingut d'una URL antiga a una nova.
      // Format:
      // {
      //   source: "/url-antiga",
      //   destination: "/url-nova",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
