/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  basePath: process.env.NODE_ENV === 'production' ? '/miniapp' : undefined,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/miniapp' : undefined,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
    NEXT_PUBLIC_EVENTS_API_URL: process.env.NEXT_PUBLIC_EVENTS_API_URL || '/events/api/v1',
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

