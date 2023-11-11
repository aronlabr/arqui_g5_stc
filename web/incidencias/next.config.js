/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'incidencias',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          // specify exposed pages and components
          './SomePage': './pages/somePage.js',
          './SomeComponent': './components/someComponent.js',
        },
        shared: {
          // specify shared dependencies
          // read more in Shared Dependencies section
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
