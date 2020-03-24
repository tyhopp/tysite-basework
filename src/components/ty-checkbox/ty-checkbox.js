import template from './ty-checkbox.html';
import './ty-checkbox.css';

class TyCheckbox extends HTMLElement {
  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._input = this.querySelector('.ty-checkbox-input');
      this._label = this.querySelector('.ty-checkbox-label');
      this._text = this.querySelector('.ty-checkbox-text');
      this._initialized = true;
    }
  }

  disconnectedCallback() {}

  setData(category) {
    const attribute = category.toLowerCase();
    this._input.setAttribute('id', attribute);
    this._input.setAttribute('name', attribute);
    this._input.setAttribute('value', category);
    this._label.setAttribute('for', attribute);
    this.setAttribute('category', category);
    this._text.textContent = category;
  }
}

customElements.define('ty-checkbox', TyCheckbox);