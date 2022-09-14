/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },

}

module.exports =  nextConfig;
