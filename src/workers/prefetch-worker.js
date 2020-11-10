const { xhr } = require('../utils/xhr-util');

/**
 * Web worker that receives a set of page paths to prefetch data for.
 */
onmessage = function (event) {
  const paths = event.data || [];
  const requests = Array.from(paths).map(path => xhr(`${path}-data.json`));
  Promise.all(requests)
    .catch(error => {
      console.warn(`Failed to prefetch page data`, error);
    });
}