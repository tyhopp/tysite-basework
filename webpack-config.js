/**
 * Custom base webpack config.
 * Merged with default configs in Basework.
 */
const createCustomWebpackConfig = async () => {
  return {
    module: {
      rules: [
        {
          test: /-worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    }
  }
}

module.exports = createCustomWebpackConfig;