import template from './index.html';

class Notes extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._initialized = true;
    }
  }

  // TODO - Refactor to use services
  prefetch() {
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
      .then(data => {
        const transformations = {
          'markdown-to-html': ['data.items.fields.body']
        }
        return { transformations, data }
      })
      .catch(error => {
        console.log(error);
      });
  }

  setData(data) {
    console.log('Prefetched data:', data);
  }
}

customElements.define('page-notes', Notes);