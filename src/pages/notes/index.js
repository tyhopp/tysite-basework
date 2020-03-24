import template from './index.html';
import './index.css';
const importCheckbox = import(/* webpackChunkName: "ty-checkbox" */'components/ty-checkbox/ty-checkbox.js');

class Notes extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._filters = this.querySelector('.notes-filters');
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
    const notes = data?.data?.items || [];
    this._setFilters(notes)
  }

  _setFilters(notes) {
    const categories = notes
      .map(note => note.fields.category)
      .flat()
      .reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], []);

    if (!categories.length) {
      return;
    }
    importCheckbox
      .then(() => {
        categories.forEach(category => {
          const checkbox = document.createElement('ty-checkbox');
          this._filters.appendChild(checkbox);
          checkbox.setData(category);
        });
      });
  }

  _setNotes() {
    // TODO - Display all notes
  }
}

customElements.define('page-notes', Notes);