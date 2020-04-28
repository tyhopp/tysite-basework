const fs = require('fs');
const path = require('path');

const getCurrentBaseworkIndex = async () => {
  return await require(path.resolve('src', 'basework-index')).getPages();
}

const recreateBaseworkIndex = async (pages, newPages) => {
  const baseworkIndexFile = `
    const getPages = async () => ${JSON.stringify([...pages, ...newPages])};

    module.exports = {
      getPages
    }
  `;
  return baseworkIndexFile;
}

const rewriteBaseworkIndexFile = baseworkIndexFile => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve('src', 'basework-index.js'), baseworkIndexFile, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

const updateBaseworkIndex = async newPages => {
  const pages = await getCurrentBaseworkIndex();
  const file = await recreateBaseworkIndex(pages, newPages);
  await rewriteBaseworkIndexFile(file);
}

module.exports = {
  updateBaseworkIndex
} 