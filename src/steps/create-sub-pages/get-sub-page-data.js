const fetch = require('node-fetch');

 const getSubPageData = () => {
   const base = 'https://cdn.contentful.com';
   const path = `spaces/${process.env.CONTENTFUL_SPACE}/environments/master`;
   const contentType = '?content_type=blogPost';
   const url = `${base}/${path}/entries${contentType}`;

   return fetch(url, {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${process.env.CONTENTFUL_TOKEN}`,
       'Content-Type': 'application/json'
     }
   })
     .then(response => response.json())
     .catch(error => {
       console.log(error);
     });
 }

 module.exports = {
   getSubPageData
 } 