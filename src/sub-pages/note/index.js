import template from './index.html';
import './index.css';

class Note extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._title = this.querySelector('.note-title');
      this._date = this.querySelector('.note-date');
      this._categories = this.querySelector('.note-categories');
      this._body = this.querySelector('.note-body');
      this._initialized = true;
    }
  }

  setData({ data: { title, slug, date, category, body } }) {
    this._title.textContent = title;
    this._date.setAttribute('datetime', date);
    this._date.textContent = 
  }
}

customElements.define('page-note', Note);