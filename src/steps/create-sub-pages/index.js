const { getSubPageData } = require('./get-sub-page-data');
const { updateBaseworkIndex } = require('./update-basework-index');
const { ensurePathExists } = require('./ensure-path-exists');
const { prefetch } = require('basework-core/prefetch');
const { transform } = require('basework-core/transform');
const { create } = require('basework-core/create');
const { prerender } = require('basework-core/prerender');

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
    await create({
      page: `notes/${page}`, 
      template: 'src/templates/note.html',
      head: {
        title: pages[page].title,
        description: pages[page].shortDescription,
        keywords: pages[page].category.join(', '),
        url: pages[page]
      },
      assetIndex: 'note',
    });
    await prerender({ page: `notes/${page}` });
  }
}

module.exports = {
  createSubPages
}