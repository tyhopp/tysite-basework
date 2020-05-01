const { format } = require('../utils/format');
const { base, path, headers } = require('../config');
const fetch = require('node-fetch');

/**
 * Creates/updates and publishes a Contentful entry.
 * @param {Object} payload The raw note text to parse
 */
const createBlogPost = async payload => {
  try {
    const blogPost = format(payload);
    const { sys: { version } = {}} = await getEntry(blogPost);
    const blogPostEntry = await createEntry({
      payload: blogPost,
      version: version ? version: 1
    });
    await publishEntry(blogPostEntry);
    return {
      statusCode: 200,
      body: `Success, published version ${blogPostEntry.sys.version++} of "${blogPost.fields.title['en-US']}"`
    }
  } catch(e) {
    console.log(`Failed to create blog post. ${e}`);
    return {
      statusCode: 500,
      body: "Internal Server Error"
    }
  }
}

/**
 * Gets an individual entry in Contentful.
 * @returns {Object} response from the Content Management API
 */
const getEntry = payload => {
  const id = payload.fields.slug['en-US']; // Use unique slug as id
  return fetch(`${base}/${path}/${id}`, {
    method: 'GET',
    headers
  })
    .then(res => {
      try {
        return res.json();
      } catch(e) {
        console.log(`Failed to parse get entry response.\n${e}`);
      }
    });
};

/**
 * Creates an individual entry in Contentful.
 * @param {Object} payload blog post payload to send
 * @returns {Object} response from the Content Management API
 */
const createEntry = ({ payload, version }) => {
  const id = payload.fields.slug['en-US']; // Use unique slug as id
  return fetch(`${base}/${path}/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'X-Contentful-Version': version
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      try {
        return res.json();
      } catch(e) {
        console.log(`Failed to parse create entry response.\n${e}`);
      }
    })
    .then(data => {
      if (data.sys.type === 'Error') {
        console.log(`❌ Failed to create Contentul entry.\n${JSON.stringify(data)}`);
        return;
      };
      console.log(`✅ Created item ${id}`);
      return data;
    });
}

/**
 * Publishes the blog post that was just created in Contentful.
 * @param {Object} entry entry object returned from Contentful
 * @param {Object} entry.sys system object returned from Contentful
 * @param {string} entry.sys.id id of the entry to publish
 * @param {string} entry.sys.version version of the entry to publish
 */
const publishEntry = ({ sys: { id, version }}) => {
  return fetch(`${base}/${path}/${id}/published`, {
    method: 'PUT',
    headers: {
      ...headers,
      'X-Contentful-Version': version
    }
  })
    .then(res => {
      try {
        return res.json();
      } catch(e) {
        console.log(`Failed to parse publish entry response.\n${e}`);
      }
    })
    .then(data => {
      if (data.sys.type === 'Error') {
        console.log(`❌ Failed to publish Contentful entry. ${data.message}`);
        return;
      };
      console.log(`✅ Published item ${id}`);
      return data;
  });
}

module.exports = {
  createBlogPost
}
