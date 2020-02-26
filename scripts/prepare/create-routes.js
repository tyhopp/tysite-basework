const path = require('path');
const fs = require('fs');

const createRoutes = async () => {
  fs.readdir(path.resolve('src/pages'), (error, pages) => {
    if (error) {
      console.error(error);
    }

    let routes = {};

    pages.forEach(page => {
      const path = page === 'index' ? '/' : `/${page}`;
      Object.defineProperty(routes, path, {
        value: page,
        writable: false,
        enumerable: true
      });
    });

    const routesFile = `const routes = ${JSON.stringify(routes)};\n\nmodule.exports = routes;`;

    fs.writeFile(path.resolve('src', 'routes.js'), routesFile, error => {
      if (error) throw error;
      console.log('Routes created');
    });
  });
}

module.exports = createRoutes;