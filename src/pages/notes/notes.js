import template from './notes.html';

const notes = () => import(/* webpackChunkName: "base" */ 'pages/base');

notes().then(() => {
  document.body.appendChild(document.getTemplate(template));
});

export default notes;