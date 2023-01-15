/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SQLITE_DATABASE: process.env.SQLITE_DATABASE,
    PORT: process.env.PORT
  },
  reactStrictMode: true,
}

module.exports = nextConfig
