const { getSubPageData } = require('./get-sub-page-data');
const { updateBaseworkIndex } = require('./update-basework-index');
const { ensurePathExists } = require('./ensure-path-exists');
const { prefetch } = require('basework/prefetch');
const { transform } = require('basework/transform');
const { create } = require('basework/create');
const { prerender } = require('basework/prerender');

const createSubPages = async () => {
  const data = await getSubPageData();
  const pages = data.items.reduce((pages, page) => {
    pages[page.fields.slug] = page.fields;
    return pages;
  }, {});
  await updateBaseworkIndex(Object.keys(pages));
  for (const page in pages) {
    await ensurePathExists(`notes/${page}`);
    await prefetch({
      page: `notes/${page}`,
      data: {
        data: pages[page],
        transformations: {
          'markdown-to-html': ['data.body'],
          'highlight-syntax': ['data.body']
        }
      }
    });
    await transform({ page: `notes/${page}` });
    await create({ page: `notes/${page}`, assetIndex: 'note' });
    await prerender({ page: `notes/${page}` });
  }
}

module.exports = {
  createSubPages
}