/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "i.scdn.co" }]
  }
};

module.exports = nextConfig;
