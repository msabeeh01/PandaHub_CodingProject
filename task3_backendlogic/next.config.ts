import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    POKEMON_API_BASE_URL:
      process.env.POKEMON_API_BASE_URL || "https://pokeapi.co/api/v2",
  },
};

export default nextConfig;
