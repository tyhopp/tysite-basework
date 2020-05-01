const { BEAR_TO_CONTENTFUL, CONTENTFUL_SPACE, CONTENTFUL_ENV } = process.env;

const base = 'https://api.contentful.com';
const path = `spaces/${CONTENTFUL_SPACE}/environments/${CONTENTFUL_ENV}/entries`;
let headers = {
  'Authorization': `Bearer ${BEAR_TO_CONTENTFUL}`,
  'Content-Type': 'application/vnd.contentful.management.v1+json',
  'X-Contentful-Content-Type': 'blogPost' // The only content type for now
};

module.exports = {
  base,
  path,
  headers
}