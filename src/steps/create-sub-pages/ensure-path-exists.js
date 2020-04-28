const fs = require('fs');
const path = require('path');

const ensurePathExists = page => {
  const pageParts = page.split('/');
  if (pageParts.length === 1) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    pageParts.pop(); // Don't create a dir for the file itself
    for (part of pageParts) {
      let pathToCheck = part;
      const index = pageParts.indexOf(part);
      if (index !== 0) {
        pathToCheck = pageParts.slice(0, index).join('/');
      }
      fs.exists(path.resolve(`dist/${pathToCheck}`), (exists, error) => {
        if (error) {
          reject(error);
        }
        if (!exists) {
          createDirectory(pathToCheck);
        }
        resolve();
      });
    }
  });
}

const createDirectory = pathToDir => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.resolve(`dist/${pathToDir}`), (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    })
  });
}

module.exports = {
  ensurePathExists
}