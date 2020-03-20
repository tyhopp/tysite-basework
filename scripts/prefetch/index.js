const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const getPageJavaScript = page => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(`src/pages/${page}/index.js`), (error, js) => {
      if (error) {
        reject(error)
      }
      resolve(js);
    });
  });
}

// TODO - Fix async
const prefetch = async routes => {
  const pages = Object.values(routes);
  const files = pages.map(async page => await getPageJavaScript(page));
  files.forEach((file, index) => {
    return file.then(buffer => {
      const code = buffer.toString();
      const ast = parser.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        sourceFilename: pages[index]
      });
      traverse(ast, {
        ClassMethod: reference => {
          if (reference.node.key.name === 'prefetch') {
            const code = generate(reference.node.body).code.toString();
            const requireStatement = `const fetch = require('node-fetch');`;
            const assignBlock = `const ${pages[index]}Prefetch = () => `;
            const exportStatement = `module.exports = ${pages[index]}Prefetch;`;
            const final = `${requireStatement}\n\n${assignBlock}${code}\n\n${exportStatement}`;
            const filepath = name => `${path.resolve('dist')}/${pages[index]}-${name}.js`;

            new Promise((resolve, reject) => {
              fs.writeFile(filepath('prerender'), final, error => {
                if (error) {
                  reject(error)
                }
                resolve();
              });
            }).then(() => {
              new Promise((resolve, reject) => {
                require(filepath('prerender'))().then(data => {
                  fs.writeFile(`${filepath('data')}on`, JSON.stringify(data), error => {
                    if (error) {
                      reject(error)
                    }
                    console.log(`Prefetched ${pages[index]} data`);
                    resolve();
                  });
                });
              });
            })
          }
        }
      })
    })
  })
}

module.exports = prefetch;