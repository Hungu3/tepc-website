/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/matangazo', destination: '/news', permanent: true },
      { source: '/matukio', destination: '/news', permanent: true },
      { source: '/fursa', destination: '/get-involved', permanent: true },
      { source: '/pakua', destination: '/publications', permanent: true },
      { source: '/kuhusu', destination: '/about', permanent: true },
    ];
  },
};

module.exports = nextConfig;
