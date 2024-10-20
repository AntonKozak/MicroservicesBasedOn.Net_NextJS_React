/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fillUrl: true,
    },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.pixabay.com' }],
  },
};

export default nextConfig;
