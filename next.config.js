/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    return config;
  }
}

module.exports = nextConfig