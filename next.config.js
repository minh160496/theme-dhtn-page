/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["eaof.vn"], // Add the domains you want to allow here
  },
};

module.exports = nextConfig;
