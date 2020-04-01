const visit = require('unist-util-visit');

// Visit the unist tree and add meta tags
const addImports = ({ assets }) => tree => {
  visit(
    tree,
    node => {
      const createScriptTag = asset => ({
        type: 'element',
        tagName: 'script',
        properties: {
          src: `/${asset}`,
          async: true
        },
        children: {},
        position: {}
      });

      const createLinkTag = asset => ({
        type: 'element',
        tagName: 'link',
        properties: {
          href: `./${asset}`,
          rel: 'preload'
        },
        children: {},
        position: {}
      });

      const appendTags = ({ node, assets }) => {
        for (const asset of assets) {
          switch (/\.([^.]*)$/.exec(asset)[1]) {
            case 'js':
              if (node.tagName === 'body') {
                node.children.push(createScriptTag(asset));
              }
              break;
            case 'css':
              if (node.tagName === 'head') {
                node.children.push(createLinkTag(asset));
              }
              break;
          }
        }
      }

      switch (node.tagName) {
        case 'head':
          appendTags({ node, assets });
          break;
        case 'body':
          appendTags({ node, assets });
          break;
      }
    }
  );
}

module.exports = {
  addImports
}