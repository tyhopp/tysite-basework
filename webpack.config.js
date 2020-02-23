const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
  'index',
  'notes'
];

const createPages = pages => {
  return pages.map(page => {
    return new HtmlWebpackPlugin({
      filename: `${page}.html`,
      chunks: [page]
    });
  });
}

module.exports = {
  mode: 'development',
  entry: {
    index: './src/pages/index/index.js',
    notes: './src/pages/notes/notes.js'
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
    ...createPages(pages),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
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
          minimize: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};