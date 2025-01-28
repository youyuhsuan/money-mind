/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  env: {
    EVERVAULT_API_KEY: process.env.EVERVAULT_API_KEY,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.riv$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
