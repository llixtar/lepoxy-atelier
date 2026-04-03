/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/a',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sbploqtiyewukhyjjkjo.supabase.co', // Твій унікальний хост Supabase
        port: '',
        pathname: '/storage/v1/object/public/**', // Дозволяємо всі публічні об'єкти в storage
      },
    ],
  },
};

export default nextConfig;