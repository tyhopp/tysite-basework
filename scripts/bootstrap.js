const dotenv = require('dotenv');
const prepare = require('./prepare');
const prefetch = require('./prefetch');
const transform = require('./transform');
const bundle = require('./bundle');
const prerender = require('./prerender');

const bootstrap = async () => {
  dotenv.config();
  const routes = await prepare();
  await prefetch(routes);
  await transform(routes); // TODO - Fix async
  // // await bundle(routes);
  // // await prerender(routes);
}

bootstrap();