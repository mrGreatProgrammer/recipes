/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'sbfnuvh0lcy3avxz.public.blob.vercel-storage.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
