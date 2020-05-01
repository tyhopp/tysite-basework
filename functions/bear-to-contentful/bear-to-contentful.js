const { createBlogPost } = require('./src/actions/create');
const { BEAR_TO_CONTENTFUL } = process.env;

/**
 * A lambda function to create/update and publish blog posts in Contentful.
 */
exports.handler = async event => {

  // Ensure credentials are passed
  if (!event.headers['bear-to-contentful'] || (event.headers['bear-to-contentful'] !== BEAR_TO_CONTENTFUL)) {
    return {
      statusCode: 401,
      body: "Invalid Credentials"
    };
  }

  // Parse method and take appropriate action
  switch(event.httpMethod) {
    case 'POST':
    case 'PUT':
      return createBlogPost(JSON.parse(event.body));
    default:
      return {
        statusCode: 405,
        body: "Method Not Allowed"
      };
  }
};