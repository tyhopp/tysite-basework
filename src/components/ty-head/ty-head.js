import template from './ty-head.html';
import { faviconIndex } from '../../assets/favicon';

class TyHead extends HTMLElement {
  
  connectedCallback() {
    if (!this._isInitialized) {
      this.appendChild(document.getTemplate(template));
      this._setFavicon();
      this._isInitialized = true;
    }
  }

  _setFavicon() {
    let path = window.location.pathname;
    path = path.includes('notes') ? '/notes' : path;
    const links = this.querySelectorAll('link[rel*=icon]');
    
    switch (path) {
      case '/':
        this._setLinks({ links, ref: 'box' });
        break;
      case '/notes':
        this._setLinks({ links, ref: 'hand' });
        break;
      default:
        this._setLinks({ links, ref: 'box' });
        break;
    }
  }

  _setLinks({ links, ref }) {
    links.forEach(link => {
      const size = /(.*?)x/.exec(link.getAttribute('sizes'))[1];
      link.href = faviconIndex[`${ref}Favicon${size}`];
    });
  }
}

customElements.define('ty-head', TyHead);