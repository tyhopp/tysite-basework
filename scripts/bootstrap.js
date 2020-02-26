const prepare = require('./prepare');
const bundle = require('./bundle');
const prerender = require('./prerender');

const bootstrap = async () => {
  const routes = await prepare();
  await bundle(routes);
  await prerender(routes);
}

bootstrap();