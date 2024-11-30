/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
}

module.exports = nextConfig
