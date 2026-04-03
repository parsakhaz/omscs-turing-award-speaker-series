/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'turing.rsvp' }],
        destination: 'https://www.turing.rsvp/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.turing.rsvp',
      },
      {
        protocol: 'https',
        hostname: 'turing.rsvp',
      },
      {
        protocol: 'https',
        hostname: 'engineering.stanford.edu',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    path: '/_next/image',
    loader: 'default',
  },
}

module.exports = nextConfig
