const path = require('path');
const fs = require('fs');
const { transformMarkdown } = require('./markdown');

const getPageData = page => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(`dist/${page}-data.json`), (error, json) => {
      if (error) {
        reject(error)
      }
      resolve(json);
    });
  });
}

// TODO - Fix async
const transform = async routes => {
  console.log('TRANSFORMING');
  const pages = Object.values(routes);
  const dataFiles = pages.map(async page => await getPageData(page));
  dataFiles.forEach((dataFile, index) => {
    return dataFile.then(buffer => {
      const stringData = buffer.toString();
      let objectData = JSON.parse(stringData);
      const transformationObject = objectData.transformations || {};
      if (!Object.keys(transformationObject).length) {
        return;
      }
      for (const key in transformationObject) {
        switch (key) {
          case 'markdown':
            const markdownTransformations = transformationObject[key];
            if (!markdownTransformations) {
              return;
            }

            const dig = (ref, section, index, sections) => {
              if (typeof ref[section] === 'string') {
                ref[section] = transformMarkdown(ref[section]);
              }
              if (typeof ref[section] === 'object') {
                index++
                const nextSection = sections[index];
                if (Array.isArray(ref[section])) {
                  ref[section].forEach(refSection => {
                    dig(refSection, nextSection, index, sections);
                  });
                } else {
                  dig(ref[section], nextSection, index, sections);
                }
              }
            };
            
            markdownTransformations.forEach(item => {
              const transformationPath = item.split('.');
              let ref = objectData;
              transformationPath.forEach((section, index) => {
                dig(ref, section, index, transformationPath);
              });
              objectData = ref;
            });
            break;
        }
      }
      delete objectData.transformations;
      let final = JSON.stringify(objectData);
      return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(`dist/${pages[index]}-data.json`), final, error => {
          if (error) {
            reject(error)
          }
          console.log(`Transformed ${pages[index]} data`);
          resolve();
        });
      })
    });
  })
}

module.exports = transform;