import template from './index.html';
import './index.css';
import '../../styles/code.css';
const importTag = import(/* webpackChunkName: "ty-tag" */'components/ty-tag/ty-tag.js');

class Note extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._title = this.querySelector('.note-title');
      this._date = this.querySelector('.note-date');
      this._categories = this.querySelector('.note-categories');
      this._body = this.querySelector('.note-body');
      this._end = this.querySelector('.note-end');
      this._initialized = true;
    }
  }

  setData({ data: { title, slug, date, category: categories, body } }) {
    this._title.textContent = title;
    this.setAttribute('id', slug);
    this._date.setAttribute('datetime', date);
    this._date.textContent = date;
    importTag.then(() => {
      categories.forEach(category => {
        const tag = document.createElement('ty-tag');
        tag.setAttribute('readonly', true);
        this._categories.appendChild(tag);
        tag.setData(category);
      });
    });
    this._body.innerHTML = body;
    this._end.removeAttribute('hidden');
  }
}

customElements.define('page-note', Note);