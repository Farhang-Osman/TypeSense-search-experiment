/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.gr-assets.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's.gr-assets.com',
        port: '',
        pathname: '**',
      },
    ],
    // domains: ['images.gr-assets.com'],
  },
};

export default nextConfig;
