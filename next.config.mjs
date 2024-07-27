/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  env: {
    EVERVAULT_API_KEY: process.env.EVERVAULT_API_KEY,
  },
};

export default nextConfig;
