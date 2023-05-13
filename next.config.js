/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig;
