import template from './index.html';
import './index.css';
const importTag = import(/* webpackChunkName: "ty-tag" */'components/ty-tag/ty-tag.js');

class Note extends HTMLElement {
  constructor() {
    super();
    this._onCategoryClick = this._onCategoryClick.bind(this);
  }

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._title = this.querySelector('.note-title');
      this._date = this.querySelector('.note-date');
      this._categories = this.querySelector('.note-categories');
      this._body = this.querySelector('.note-body');
      this._setListeners(true);
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._setListeners(false);
  }

  setData({ data: { title, date, category: categories, body } }) {
    this._title.textContent = title;
    this._date.setAttribute('datetime', date);
    this._date.textContent = date;
    importTag.then(() => {
      categories.forEach(category => {
        const tag = document.createElement('ty-tag');
        this._categories.appendChild(tag);
        tag.setData(category);
      });
    });
    this._body.innerHTML = body;
  }

  _setListeners(flag) {
    const fnName = flag ? 'addEventListener' : 'removeEventListener';
    this._categories[fnName]('click', this._onCategoryClick);
  }

  _onCategoryClick(e) {
    if (e.target.tagName === 'TY-TAG') {
      const anchor = document.createElement('a');
      anchor.href = `/notes?category=${e.target.getAttribute('value')}`;
      this.appendChild(anchor);
      anchor.click();
    }
  }
}

customElements.define('page-note', Note);