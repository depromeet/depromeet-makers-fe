/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
