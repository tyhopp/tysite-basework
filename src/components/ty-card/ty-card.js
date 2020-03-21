import template from './ty-card.html';
import './ty-card.css';

class TyCard extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._logo = this.querySelector('.ty-card-logo');
      this._title = this.querySelector('.ty-card-title');
      this._position = this.querySelector('.ty-card-position');
      this._description = this.querySelector('.ty-card-description');
      this._button = this.querySelector('.ty-card-button');
      this._theme = document.querySelector('html').dataset.theme;
      this._initialized = true;
    }
  }

  setData(data) {
    const { logo, darkLogo, title, position, description, link } = data;
    // TODO - Resolve image url
    // this._setLogo({ lightLogo: logo, darkLogo });
    this._title.textContent = title;
    this._position.textContent = position;
    this._description.innerHTML = description;
    this._setButton({ href: link });
  }

  _setLogo({ lightLogo , darkLogo }) {
    const logo = this._theme === 'dark' ? darkLogo : lightLogo;
    this._logo.setAttribute('alt', logo?.description);
    this._logo.setAttribute('src', logo?.file?.url);
  }

  _setButton({ href, text = 'See company', accent }) {
    this._button.href = href;
    this._button.textContent = text;
    this._button.style.backgroundColor = accent;
  }
}

customElements.define('ty-card', TyCard);