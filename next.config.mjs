/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js and its ecosystem ship ESM that benefits from transpilation
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // keep the heavy 3D/animation libs out of the main entry chunk
    optimizePackageImports: ["@react-three/drei", "framer-motion", "react-icons"],
  },
};

export default nextConfig;
