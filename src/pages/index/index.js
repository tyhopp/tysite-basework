import(/* webpackChunkName: "base" */ '../../base');
import template from './index.html';

class Index extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._initialized = true;
    }
  }

}

customElements.define('page-index', Index);