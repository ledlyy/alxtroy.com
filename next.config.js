/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // App Router is default in Next 15
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    qualities: [75, 92, 100],
  },
  // Security headers and CSP are set in middleware.ts to allow nonces
}

module.exports = nextConfig
