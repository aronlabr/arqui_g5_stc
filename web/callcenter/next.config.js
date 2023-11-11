const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'callc',
        filename: `static/chunks/remoteEntry.js`,
        remotes: {
          main: `main@${process.env.MAIN_URL}/_next/static/chunks/remoteEntry.js`,
        },
        exposes: {
          // specify exposed pages and components
          './agregarForm': './src/pages/agregarForm.js',
        },
        extraOptions: {
          exposePages: true,
        },
        shared: {},
      }),
    );

    return config;
  },
};

module.exports = nextConfig;

// name: 'callcenter',
//         filename: `static/chunks/remoteEntry.js`,
//         remotes: {
//           main: `main@${process.env.MAIN_URL}/_next/static/chunks/remoteEntry.js`,
//         },
//         exposes: {
//           './[id]': './src/pages/[id].js',
//           './agregar': './src/pages/agregar.js',
//         },
//         extraOptions: {
//           exposePages: true,
//         },
//         shared: {},
