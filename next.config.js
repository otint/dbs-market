/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
}

module.exports = withPlausibleProxy({
  customDomain: 'https://stats.dead.tools',
})(nextConfig)
