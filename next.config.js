/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:3000/",
        port: "",
        pathname: "/comments/**",
      },
    ],
  },
};

module.exports = nextConfig;
