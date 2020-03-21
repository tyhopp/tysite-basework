const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify');

// TODO - Fix async
function markdownToHtml(rawMarkdown) {
  return unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)
    .processSync(rawMarkdown).contents;
}

module.exports = {
  markdownToHtml
}