const webpack = require('webpack');
const config = require('../webpack.config.js');

/**
 * Runs webpack to bundle all assets.
 */
const bundle = async () => webpack(config).run((error, stats) => {
  if (error) {
    return error;
  }
  
  console.log('Site bundled');
  return stats;
});

// TODO - Improve error handling output
// TODO - Explore if stats is useful for anything

module.exports = bundle;