const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'tables',
        filename: `static/chunks/remoteEntry.js`,
        remotes: {
          main: `main@${process.env.MAIN_URL}/_next/static/chunks/remoteEntry.js`,
        },
        exposes: {
          // specify exposed pages and components
          './incidencias': './src/pages/incidlist.js',
          './table': './src/components/ui/table.jsx',
        },
        extraOptions: {
          exposePages: true,
        },
        shared: {
          bootstrap: {
            singleton: true,
            requiredVersion: false,
          },
          'react-bootstrap': {
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
