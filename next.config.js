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
  eslint : {
    ignoreDuringBuilds : true
  },
  typescript : {
    ignoreBuildErrors : true
  },
  env : {
    PROVIDER_CLIENT_SECRET : "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",
    PROVIDER_CLIENT_ID : "229256620237-40sl0d12e0s8gju3pv9pifo1v3l109lb.apps.googleusercontent.com",
    NEXTAUTH_SECRET : "a6e38b2bb1f1e381ee7fe68dc68b01726952b9f992c89aaf7b053b0551e52832",
    MONGODB_URI : "https://github.com/petersahanaya/nextjs-social-media/commit/7fa236ebfbec0f5d22337d207b5fa5b1ee8ff74b#diff-e9cbb0224c4a3d23a6019ba557e0cd568c1ad5e1582ff1e335fb7d99b7a1055d"
  }
}

module.exports = nextConfig
