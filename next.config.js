/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  },
  staticPageGenerationTimeout: 600000, // 5 minutes in milliseconds
}

module.exports = nextConfig;
