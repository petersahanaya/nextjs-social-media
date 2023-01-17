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
    MONGODB_URI : "mongodb+srv://p3tr:GhGPvqrw1OdpoQ6m@social-media.ht6zlrm.mongodb.net/?retryWrites=true&w=majority",
    CLOUD_NAME : "digf2wzdn",
    API_KEY : "865765212592229",
    API_SECRET : "OUDjqXWahyFIIoJsPFN5Nd1RSxc",
    CLOUD_URL : "https://api.cloudinary.com/v1_1/digf2wzdn/image/upload"
  }
}

module.exports = nextConfig
