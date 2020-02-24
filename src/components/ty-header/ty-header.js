import template from './ty-header.html';
import './ty-header.css';

class TyHeader extends HTMLElement {
  constructor() {
    super();
    this._setCurrentNav = this._setCurrentNav.bind(this);
  }

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._setCurrentNav();
      this._setListeners(true);
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._setListeners(false);
  }

  _setCurrentNav() {
    const navs = this.querySelectorAll('.ty-header-nav');
    Array.from(navs).forEach(nav => {
      const isCurrentRoute = nav.href === window.location.href;
      nav.classList[isCurrentRoute ? 'add' : 'remove']('ty-header-nav--current');
    });
  }

  _setListeners(flag) {
    const fnName = flag ? 'addEventListener' : 'removeEventListener';
    window[fnName]('popstate', this._setCurrentNav);
  }
}

customElements.define('ty-header', TyHeader);