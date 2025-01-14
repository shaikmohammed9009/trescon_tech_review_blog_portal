/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: { unoptimized: true },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;