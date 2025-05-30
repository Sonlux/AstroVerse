import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with the actual domain
        port: '',
        pathname: '/path/to/your/images/**', // Adjust path if needed
      },
      // ... other remote patterns like for via.placeholder.com
    ],
  },
};

export default nextConfig;
