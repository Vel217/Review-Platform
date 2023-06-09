/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
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