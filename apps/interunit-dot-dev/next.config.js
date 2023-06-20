/** @type {import('next').NextConfig} */

    // Responds to updates from interunit packages
const withPreconstruct = require('@preconstruct/next')

const nextConfig = {}

module.exports = withPreconstruct({...nextConfig})
