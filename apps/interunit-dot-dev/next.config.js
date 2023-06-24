/** @type {import('next').NextConfig} */

    // Responds to updates from interunit packages
const withPreconstruct = require('@preconstruct/next')

const nextConfig = {
 typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = withPreconstruct({...nextConfig})
