/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  rewrites: async () => [
    {
      source: '/uncharted-waters-2',
      destination: '/uncharted-waters-2/index.html',
    },
    {
      source: '/gta-online/fingerprint-scanner-simulator',
      destination: '/gta-online/fingerprint-scanner-simulator/index.html',
    },
  ],
};
