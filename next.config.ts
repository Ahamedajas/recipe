import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themealdb.com'], // Add the external domain for images
  },
};

export default nextConfig;
