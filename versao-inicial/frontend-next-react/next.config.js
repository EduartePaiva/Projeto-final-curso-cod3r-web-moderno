/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com'
      }
    ]
  }
}

//https://i.imgur.com/k3njxmH.jpg
module.exports = nextConfig
