import template from './index.html';
import './index.css';
const importCard = import(/* webpackChunkName: "ty-card" */'components/ty-card/ty-card.js');

class Index extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._cardsContainer = this.querySelector('.index-cards');
      this._end = this.querySelector('.index-end');
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
    if (this._cardsContainer.childElementCount === portfolioItems.length) {
      return;
    }
    portfolioItems.sort((a, b) => a?.fields?.order - b?.fields?.order);
    const assets = data?.data?.includes?.Asset;
    this._setCards(portfolioItems, assets);
    this._end.removeAttribute('hidden');
  }

  _setCards(portfolioItems, assets) {
    importCard.then(() => {
      portfolioItems.forEach(portfolioItem => {
        const data = portfolioItem?.fields;
        data.logo = this._getAsset(assets, data?.logo?.sys?.id);
        data.darkLogo = this._getAsset(assets, data?.darkLogo?.sys?.id)
        const card = document.createElement('ty-card');
        this._cardsContainer.appendChild(card);
        card.setData(data);
      });
    });
  }

  _getAsset(assets, id) {
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (asset?.sys?.id === id) {
        return asset.fields;
      }
    };
  }
}

customElements.define('page-index', Index);