import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
