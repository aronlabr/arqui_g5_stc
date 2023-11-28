const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

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
          './agregarInc': './src/pages/agregarForm.js',
          './incidentForm': './src/components/ui/incidentForm.jsx',
        },
        extraOptions: {
          exposePages: true,
        },
        shared: {
          bootstrap: {
            eager: true,
            singleton: true,
            requiredVersion: deps.bootstrap,
          },
          'react-bootstrap': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-bootstrap'],
          },
        },
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
