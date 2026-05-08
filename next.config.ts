import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['g-global.com', 'opengraph.githubassets.com'], // Agrega el dominio permitido
  }
};

export default nextConfig;
