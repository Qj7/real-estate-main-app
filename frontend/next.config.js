/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '',
  assetPrefix: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images1.apartments.com', pathname: '/**' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
  // В dev проксируем /api на бэкенд — запросы идут на тот же origin, CORS не нужен
  ...(isDev && {
    rewrites: async () => [
      { source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' },
    ],
  }),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
