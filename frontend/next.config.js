/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.render.com' },
    ],
  },
  // API calls go directly to NEXT_PUBLIC_API_URL from the client
  // No rewrites needed — frontend calls backend URL directly
};
module.exports = nextConfig;
