/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/user',
        destination: 'http://localhost:3000/api/user*'
      }
    ]
  }
};

export default nextConfig;
