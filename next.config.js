/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
