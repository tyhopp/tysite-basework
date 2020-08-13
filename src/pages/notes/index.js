import template from './index.html';
import './index.css';
const importTag = import(/* webpackChunkName: "ty-tag" */'components/ty-tag/ty-tag.js');

class Notes extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._previews = this.querySelector('.notes-previews');
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
        return data.items.map(item => {
          const { title, slug, date, category } = item.fields;
          return { title, slug, date, category };
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setData(data) {
    const notes = data.sort((a, b) => new Date(b?.date) - new Date(a?.date));
    this._renderNotes(notes);
  }

  _renderNotes(notes) {
    const notesFragment = new DocumentFragment();
    notes.forEach(note => {
      const preview = document.createElement('article');
      const title = document.createElement('h3');
      const titleAnchor = document.createElement('a');
      const categories = document.createElement('div');
      preview.classList.add('notes-preview-item');
      title.classList.add('notes-preview-item-title');
      titleAnchor.classList.add('notes-preview-item-title-anchor');
      categories.classList.add('notes-preview-item-categories');
      title.textContent = note?.title;
      titleAnchor.setAttribute('href', `/notes/${note?.slug}`);
      titleAnchor.appendChild(title);
      preview.appendChild(titleAnchor);
      importTag.then(() => {
        note?.category.forEach(category => {
          const tag = document.createElement('ty-tag');
          tag.setAttribute('readonly', true);
          categories.appendChild(tag);
          tag.setData(category);
        });
      });
      preview.appendChild(categories);
      preview.dataset.categories = note?.category;
      notesFragment.appendChild(preview);
    });
    this._previews.appendChild(notesFragment);
  }
}

customElements.define('page-notes', Notes);