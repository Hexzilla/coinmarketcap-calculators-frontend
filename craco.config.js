const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#78067a' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
//'#7a569e'