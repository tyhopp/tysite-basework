import template from './index.html';
import './index.css';

class Index extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._initialized = true;
    }
  }

  prefetch() {
    const base = 'https://cdn.contentful.com';
    const path = `spaces/${process.env.CONTENTFUL_SPACE}/environments/master`;
    const contentType = '?content_type=portfolioItem';
    const url = `${base}/${path}/entries${contentType}`;
    
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data.includes)
      .catch(error => {
        console.log(error);
      });
  }

  setData(data) {
    console.log('Prefetched data:', data);
  }
}

customElements.define('page-index', Index);