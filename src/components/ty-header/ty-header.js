import template from './ty-header.html';
import './ty-header.css';

class TyHeader extends HTMLElement {
  constructor() {
    super();
    this._setCurrentNav = this._setCurrentNav.bind(this);
  }

  connectedCallback() {
    if (!this._initialized) {
      if (!this.children.length) { // TODO - Figure out why double links appended in prod
        this.appendChild(document.getTemplate(template));
      }
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
      const origin = `${window.location.origin}`;
      const pathname = `${window.location.pathname}`;
      const isCurrentRoute = nav.href === `${origin}/`
        ? nav.href === `${origin}${pathname}` // If index, compare strictly
        : `${origin}${pathname}`.includes(nav.href); // If other route, compare inclusively
      nav.classList[isCurrentRoute ? 'add' : 'remove']('ty-header-nav--current');
    });
  }

  _setListeners(flag) {
    const fnName = flag ? 'addEventListener' : 'removeEventListener';
    window[fnName]('popstate', this._setCurrentNav);
  }
}

customElements.define('ty-header', TyHeader);