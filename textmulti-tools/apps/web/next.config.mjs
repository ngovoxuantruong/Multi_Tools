/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output enables optimized production deployments.
  // Only the necessary files are copied to the output directory.
  output: "standalone",
};

export default nextConfig;
