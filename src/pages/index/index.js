import(/* webpackChunkName: "base" */ 'pages/base');
import template from './index.html';

class Index {

  render = () => {
    document.body.appendChild(document.getTemplate(template));
  };
  
}

export default new Index;