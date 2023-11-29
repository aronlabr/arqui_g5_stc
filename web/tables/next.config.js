const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
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
          './tabledata': './src/components/ui/table.jsx',
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
          dayjs: {
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
