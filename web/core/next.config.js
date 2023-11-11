const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    tables: `tables@${process.env.TABLES_URL}/_next/static/${location}/remoteEntry.js`,
    // incidencias: `incidencias@${process.env.INCID_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack(config, { isServer }) {
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'main',
  //       filename: 'static/chunks/remoteEntry.js',
  //       remotes: remotes(isServer),
  //       shared: {},
  //     }),
  //   );

  //   return config;
  // },
};

module.exports = nextConfig;
