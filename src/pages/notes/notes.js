import(/* webpackChunkName: "base" */ '../../base');
import template from './notes.html';

class Notes extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._initialized = true;
    }
  }

}

customElements.define('page-notes', Notes);