const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/**
 * Helper function to create pages from routes.
 */
const createPages = routes => {
  return Object.values(routes).map(page => {
    return new HtmlWebpackPlugin({
      title: 'test',
      template: './src/base.html',
      filename: `${page}.html`,
      chunks: ['base', page]
    });
  });
}

/**
 * Main function to generate webpack config.
 */
const createConfig = async routes => {
  if (!routes) { // TODO - Pass in env and only get routes again if dev
    const prepare = require('./scripts/prepare');
    routes = await prepare();
  }

  return {
    mode: 'development',
    entry: {
      base: './src/base.js'
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Where to find assets
      publicPath: '/' // Where to serve assets
    },
    devtool: 'inline-source-map', // Should be used for dev only
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'), // Where to find assets
      publicPath: '/' // Where to serve assets
    },
    plugins: [
      ...createPages(routes),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin()
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        components: path.resolve(__dirname, 'src/components/'),
        styles: path.resolve(__dirname, 'src/styles/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        assets: path.resolve(__dirname, 'src/assets/')
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            interpolate: true
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: [
            { 
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            { 
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
}

module.exports = createConfig;