const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

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
  env: {
    API_URL: process.env.API_URL,
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  },
  // webpack(config, { isServer }) {
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'main-app',
  //       filename: `static/chunks/remoteEntry.js`,
  //       remotes: remotes(isServer),
  //       exposes: {},
  //       extraOptions: {},
  //       shared: {},
  //     }),
  //   );

  //   return config;
  // },
};

module.exports = nextConfig;
