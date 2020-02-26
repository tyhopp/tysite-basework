const prepare = require('./prepare');
const bundle = require('./bundle');
const prerender = require('./prerender');

const bootstrap = async () => {
  await prepare();
  await bundle();
  await prerender();
}

bootstrap();