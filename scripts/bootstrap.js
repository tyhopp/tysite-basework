const webpack = require('webpack');
const config = require('../webpack.config.js');
const ssr = require('./ssr');

const bundle = new Promise((resolve, reject) => {
  webpack(config).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      resolve(stats);
    }
  });
});

bundle.then(() => {
  ssr('/');
});