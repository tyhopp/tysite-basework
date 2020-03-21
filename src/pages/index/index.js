import template from './index.html';
import './index.css';
// TODO - Find a more elegant way to do this
const importCard = import(/* webpackChunkName: "ty-card" */'components/ty-card/ty-card.js');

class Index extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._cardsContainer = this.querySelector('.index-cards');
      this._initialized = true;
    }
  }

  // TODO - Refactor to use services
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
      .then(data => {
        const transformations = {
          'markdown-to-html': ['data.items.fields.description']
        }
        return { transformations, data };
      })
      .catch(error => {
        console.log(error);
      });
  }

  setData(data) {
    const portfolioItems = data?.data?.items || [];
    portfolioItems.forEach(portfolioItem => {
      const data = portfolioItem.fields;
      importCard.then(() => {
        const card = document.createElement('ty-card');
        this._cardsContainer.appendChild(card);
        card.setData(data);
      })
    });
  }
}

customElements.define('page-index', Index);