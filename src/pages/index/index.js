import template from './index.html';

const render = () => import(/* webpackChunkName: "base" */ 'pages/base');

render().then(() => {
  document.body.appendChild(document.getTemplate(template));
});

export default render;