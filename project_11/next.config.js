/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Remove transpilePackages as it's not needed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;