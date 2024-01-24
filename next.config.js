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
  staticPageGenerationTimeout: 300000, // 5 minutes in milliseconds
}

module.exports = nextConfig;
