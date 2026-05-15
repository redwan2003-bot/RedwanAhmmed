/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/RedwanAhmmed',
  assetPrefix: '/RedwanAhmmed',
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
