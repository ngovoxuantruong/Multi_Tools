/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a standalone build artifact for Docker/Oubernetes deployments.
  // The Dockerfile's "runner" stage copies only this folder, keeping
  // the final image minimal (no devDependencies, no source maps, etc.).
  output: "standalone",
};

export default nextConfig;
