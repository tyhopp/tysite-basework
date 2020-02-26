const createConfig = require('../../webpack.config.js');
const runWebpack = require('./run-webpack');

/**
 * Runs webpack to bundle all assets.
 */
const bundle = async routes => {
  const config = await createConfig(routes);

  if (!config) {
    console.error('No webpack config found');
    return;
  }

  await runWebpack(config);
}

// TODO - Improve error handling output
// TODO - Explore if stats is useful for anything

module.exports = bundle;