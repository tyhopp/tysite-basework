import template from './index.html';
import './index.css';
const importCheckbox = import(/* webpackChunkName: "ty-checkbox" */'components/ty-checkbox/ty-checkbox.js');
const importTag = import(/* webpackChunkName: "ty-tag" */'components/ty-tag/ty-tag.js');

class Notes extends HTMLElement {
  constructor() {
    super();
    this._onFilterSelect = this._onFilterSelect.bind(this);
    this._onCategorySelect = this._onCategorySelect.bind(this);
  }

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._filters = this.querySelector('.notes-filters');
      this._previews = this.querySelector('.notes-previews');
      this._setListeners(true);
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._setListeners(false);
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
        console.error(error);
      });
  }

  setData(data) {
    const notes = data?.data?.items || [];
    this._renderFilters(notes);
    this._renderNotes(notes);
  }

  _setListeners(flag) {
    const fnName = flag ? 'addEventListener' : 'removeEventListener';
    this._filters[fnName]('change', this._onFilterSelect);
    this._previews[fnName]('click', this._onCategorySelect);
  }

  _renderFilters(notes) {
    const categories = notes
      .map(note => note?.fields?.category)
      .flat()
      .reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], []);

    this._categories = categories;

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

  _renderNotes(notes) {
    notes.forEach(note => {
      // TODO - Refactor to use document fragment
      const preview = document.createElement('article');
      const title = document.createElement('h3');
      const titleAnchor = document.createElement('a');
      const categories = document.createElement('div');
      preview.classList.add('notes-preview-item');
      title.classList.add('notes-preview-item-title');
      titleAnchor.classList.add('notes-preview-item-title-anchor');
      categories.classList.add('notes-preview-item-categories');
      title.textContent = note?.fields?.title;
      titleAnchor.setAttribute('href', `/notes/${note?.fields?.slug}`);
      titleAnchor.appendChild(title);
      preview.appendChild(titleAnchor);
      importTag.then(() => {
        note?.fields?.category.forEach(category => {
          const tag = document.createElement('ty-tag');
          categories.appendChild(tag);
          tag.setData(category);
        });
      });
      preview.appendChild(categories);
      preview.dataset.categories = note?.fields?.category;
      this._previews.appendChild(preview);
    });
  }

  _filterNotes() {
    Array.from(this._previews.children).forEach(note => {
      const noteCategories = note.dataset.categories.split(',');
      const noteHasActiveCategory = noteCategories.some(noteCategory => this._categories.includes(noteCategory));
      // TODO - Highlight note categories that are active
      const fnName = noteHasActiveCategory ? 'remove' : 'add';
      note.classList[fnName]('hidden');
    });
  }

  _updateFilters(category) {
    Array.from(this._filters.children).forEach(filter => {
      const input = filter.querySelector('.ty-checkbox-input');
      input.checked = input.value === category;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  _onFilterSelect(e) {
    const category = e.target.value;
    const checked = e.target.checked;
    if (checked && !this._categories.includes(category)) {
      this._categories.push(category);
    }
    if (!checked && this._categories.includes(category)) {
      this._categories = this._categories.filter(filterCategory => filterCategory !== category);
    }
    this._filterNotes();
    window.scrollTo(0, 0);
  }

  _onCategorySelect(e) {
    if (e.target.tagName === 'TY-TAG') {
      this._categories = this._categories.filter(filterCategory => filterCategory !== e.target.textContent);
      this._updateFilters(e.target.textContent);
    }
  }
}

customElements.define('page-notes', Notes);