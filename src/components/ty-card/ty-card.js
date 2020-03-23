import template from './ty-card.html';
import './ty-card.css';
import { themeObserver } from 'utils/mutation-util';

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
      this._theme = document.querySelector('html').dataset.theme;
      this._setListeners(true);
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    // this._setListeners(false);
  }

  setData({ logo, darkLogo, title, position, description, link } = {}) {
    this._lightLogo = logo;
    this._darkLogo = darkLogo;
    this._setLogo({ logo, darkLogo, theme: this._theme });
    this._title.textContent = title;
    this._position.textContent = position;
    this._description.innerHTML = description;
    this._setButton({ href: link });
  }

  _setListeners(flag) {
    themeObserver()
      .then(theme => this._onThemeChange(theme))
      .catch(error => {
        console.error(error);
      });
  }

  _setLogo({ logo, darkLogo, theme }) {
    const themedLogo = theme === 'dark' ? darkLogo : logo;
    console.log(themedLogo);
    this._logo.setAttribute('alt', themedLogo?.description);
    this._logo.setAttribute('src', themedLogo?.file?.url);
  }

  _setButton({ href, text = 'See company', accent }) {
    this._button.href = href;
    this._button.textContent = text;
    this._button.style.backgroundColor = accent;
  }

  _onThemeChange(theme) {
    console.log(theme);
    this._setLogo({ logo: this._lightLogo, darkLogo: this._darkLogo, theme });
  }
}

customElements.define('ty-card', TyCard);