const baseworkConfig = () => ({
  bundler: 'webpack',
  build: [
    'prepare',
    'prefetch',
    'transform',
    'bundle',
    'create',
    'prerender',
    'createSubPages'
  ]
});

module.exports = baseworkConfig;