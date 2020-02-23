import(/* webpackChunkName: "base" */ 'pages/base');
import template from './notes.html';

class Notes {

  render = () => {
    document.body.appendChild(document.getTemplate(template));
  };

}

export default new Notes;