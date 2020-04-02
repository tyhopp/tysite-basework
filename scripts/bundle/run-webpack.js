const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const runWebpack = config => {
  return new Promise((resolve, reject) => {
    webpack(config).run((error, stats) => {
      if (error) {
        reject(error);
      }
      
      console.log('Bundled assets');

      const statsObject = JSON.stringify(stats.toJson({ all: false, chunkGroups: true }));
      const statsFile = `
        const stats = ${statsObject}

        module.exports = {
          stats
        }
      `;
      fs.writeFileSync(path.resolve('dist/webpack.stats.js'), statsFile);
      resolve(stats);
    });
  });
}

module.exports = {
  runWebpack
}