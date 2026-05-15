/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Only apply basePath/assetPrefix in production (GitHub Pages)
  basePath: isProd ? '/RedwanAhmmed' : '',
  assetPrefix: isProd ? '/RedwanAhmmed' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
