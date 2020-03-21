const dotenv = require('dotenv');
const prepare = require('./prepare');
const prefetch = require('./prefetch');
const transform = require('./transform');
const bundle = require('./bundle');
const prerender = require('./prerender');

const bootstrap = async () => {
  dotenv.config();
  const routes = await prepare();
  await prefetch(routes); // Make ahead-of-time network requests and save data locally
  await transform(routes); // Perform transformations on prefetched data (e.g. markdown to html)
  await bundle(routes); // Bundle site resources using webpack
  await prerender(routes); // Load site pages in a headless browser to prerender html
}

bootstrap();