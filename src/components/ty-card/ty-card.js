import template from './ty-card.html';
import './ty-card.css';

class TyCard extends HTMLElement {

  connectedCallback() {
    if (!this._initialized) {
      this.appendChild(document.getTemplate(template));
      this._logo = this.querySelector('.ty-card-logo');
      this._title = this.querySelector('.ty-card-title');
      this._position = this.querySelector('.ty-card-position');
      this._list = this.querySelector('.ty-card-list');
      this._button = this.querySelector('.ty-card-button');
      this._theme = document.querySelector('html').dataset.theme;
      this._initialized = true;
    }
  }

  setData(data) {
    const { logo, darkLogo, title, position, bullets, link } = data;
    this._setLogo({ lightLogo: logo, darkLogo });
    this._title.textContent = title;
    this._position.textContent = position;
    this._setListItems({ title, bullets });
    this._setButton(link);
  }

  _setLogo({ lightLogo , darkLogo }) {
    const logo = this._theme === 'dark' ? darkLogo : lightLogo;
    this._logo.setAttribute('alt', logo?.description);
    this._logo.setAttribute('src', logo?.file?.url);
  }

  _setListItems({ title, bullets }) {
    const listItems = document.createDocumentFragment();
    (bullets?.content || []).forEach(bullet => {
      const item = document.createElement('li');
      item.classList.add('ty-card-list-item');
      item.classList.add(`ty-card-list-item--${title.toLowerCase().replace(/\s/, '-')}`)
      item.textContent = bullet?.body?.body;
      listItems.appendChild(item);
    });
    this._list.appendChild(listItems);
  }

  _setButton({ href, text, accent }) {
    this._button.href = href;
    this._button.textContent = text;
    this._button.style.backgroundColor = accent;
  }
}

customElements.define('ty-card', TyCard);