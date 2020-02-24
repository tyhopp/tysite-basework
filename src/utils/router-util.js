import { routes } from '../routes.js';

(() => {

  const navigate = path => {
    const main = document.querySelector('main');
    const route = routes[path] ? routes[path] : 'index';
    if (main.children.length) {
      Array.from(main.children).forEach(child => child.remove());
    }
    main.appendChild(document.createElement(`page-${route}`));
  }

  navigate(window.location.pathname);

  window.addEventListener('popstate', () => {
    navigate(window.location.pathname);
  });

  document.addEventListener('click', e => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.target !== '_blank') {
      e.preventDefault();
      
      const url = anchor.href;
      const state = anchor.state ? { url, ...JSON.parse(anchor.state) } : { url };

      try {
        history.pushState(state, null, url);
        dispatchEvent(new PopStateEvent('popstate', { state }));
      } catch (e) {
        window.location.assign(url);
      }
    }
  });
})();