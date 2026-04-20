//@ts-check
const { withNx } = require('@nx/next');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  // nx: {},
  compiler: {
    // Enable SWC-based Emotion transform (covers libs/ui and any imported styled components)
    emotion: true,
  },
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/contact-app-media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/contact-app-media/**',
      },
      {
        protocol: 'http',
        hostname: 'minio',
        port: '9000',
        pathname: '/contact-app-media/**',
      },
    ],
  },
};

module.exports = withNx(nextConfig);
