const webpack = require('webpack');

const runWebpack = config => {
  return new Promise((resolve, reject) => {
    webpack(config).run((error, stats) => {
      if (error) {
        reject(error);
      }
      
      console.log('Site bundled');
      resolve(stats);
    });
  });
}

module.exports = {
  runWebpack
}