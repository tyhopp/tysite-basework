const dotenv = require('dotenv');
const prepare = require('./prepare');
const prefetch = require('./prefetch');
const bundle = require('./bundle');
const prerender = require('./prerender');

const bootstrap = async () => {
  dotenv.config();
  const routes = await prepare();
  await prefetch(routes);
  await bundle(routes);
  await prerender(routes);
}

bootstrap();