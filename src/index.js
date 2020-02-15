// DOM adjustments
import './utils/template-util.js';
import './utils/theme-util.js';

// App styles
import './styles/main.css';
import './styles/prism.css';

// Components
import './components/ty-head/ty-head.js';
import './components/ty-header/ty-header.js';
import './components/ty-card/ty-card.js';

// TODO - Find a solution for custom <head>

// Index
import template from './index.html';
document.body.appendChild(document.getTemplate(template));