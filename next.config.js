/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "**"
      }
    ]
  },
  env : {
    PROVIDER_CLIENT_SECRET : "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",
    PROVIDER_CLIENT_ID : "229256620237-th8na2ds21piitcrp2ljg6nnugp9h13p.apps.googleusercontent.com",
    NEXTAUTH_SECRET : "a6e38b2bb1f1e381ee7fe68dc68b01726952b9f992c89aaf7b053b0551e52832"
  }
}

module.exports = nextConfig
