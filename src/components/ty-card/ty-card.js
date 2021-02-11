import template from './ty-card.html';
import './ty-card.css';
import { theme } from 'utils/theme-util';

class TyCard extends HTMLElement {
  constructor() {
    super();
    this._onThemeChange = this._onThemeChange.bind(this);
  }

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._logo = this.querySelector('.ty-card-logo');
      this._title = this.querySelector('.ty-card-title');
      this._position = this.querySelector('.ty-card-position');
      this._description = this.querySelector('.ty-card-description');
      this._button = this.querySelector('.ty-card-button');
      this._theme = theme({ callback: this._onThemeChange });
      this._theme.subscribe();
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._theme.unsubscribe();
  }

  setData({ logo, darkLogo, title, position, description, link, accent } = {}) {
    this._lightLogo = logo;
    this._darkLogo = darkLogo;
    this._setLogo({ theme: this._theme.initial });
    this._title.textContent = title;
    this._position.textContent = position;
    this._description.innerHTML = description;
    this._description.classList.add(
      `ty-card-description--${title.replace(/\s/, '-').toLowerCase()}`
    );
    this._setButton({ href: link, accent });
  }

  _setLogo({ theme = 'light' }) {
    const logo = theme === 'dark' ? this._darkLogo : this._lightLogo;
    this._logo.setAttribute('alt', logo?.description);
    this._logo.setAttribute('src', logo?.file?.url);
  }

  _setButton({ href, text = 'See company', accent }) {
    this._button.href = href;
    this._button.textContent = text;
    this._button.style.backgroundColor = accent;
  }

  _onThemeChange(theme) {
    this._setLogo({ theme });
  }
}

customElements.define('ty-card', TyCard);