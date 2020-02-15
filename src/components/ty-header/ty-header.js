import template from './ty-header.html';
import './ty-header.css';

class TyHeader extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._navs = this.querySelectorAll('.ty-header-nav');
      this._setCurrentNav();
      this._initialized = true;
    }
  }

  _setCurrentNav() {
    const navs = this.querySelectorAll('.ty-header-nav');
    Array.from(navs).forEach(nav => {
      if (nav.href === window.location.href) {
        nav.classList.add('ty-header-nav--current');
      }
    })
  }
}

customElements.define('ty-header', TyHeader);