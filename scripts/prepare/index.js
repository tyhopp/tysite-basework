const createRoutes = require('./create-routes');

/**
 * Does all the necessary preparation required to bundle the site.
 */
const prepare = async () => {
  await createRoutes();
  // Add page import statements to base.js
}

module.exports = prepare;