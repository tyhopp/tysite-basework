import(/* webpackChunkName: "base" */ 'pages/base');
import template from './index.html';

class Index {

  render = () => {
    document.querySelector('main[data-page]').appendChild(document.getTemplate(template));
  };
  
}

export default new Index;