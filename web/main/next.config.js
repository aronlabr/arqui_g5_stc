const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

/** @type {import('next').NextConfig} */

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    tables: `tables@${process.env.TABLES_URL}/_next/static/${location}/remoteEntry.js`,
    callc: `callc@${process.env.CALLC_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'main-app',
        filename: `static/chunks/remoteEntry.js`,
        remotes: remotes(isServer),
        exposes: {},
        extraOptions: {},
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
