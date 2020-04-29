import template from './ty-tag.html';
import './ty-tag.css';

class TyTag extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._tagText = this.querySelector('.ty-tag-text');
      this._initialized = true;
    }
  }

  setData(text) {
    this._tagText.textContent = text;
  }
}

customElements.define('ty-tag', TyTag);