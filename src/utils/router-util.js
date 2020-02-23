import index from 'pages/index/index.js';
import notes from 'pages/notes/notes.js';

(() => {
  const routes = {
    '/': index,
    '/notes': notes
  }

  // TODO - Improve this
  const navigate = path => {

    const main = document.querySelector('main[data-page]');

    if (main.dataset.page !== path) {
      const page = main.firstElementChild;
      if (page) {
        page.remove();
      }
      main.dataset.page = path;
      routes[path].render();
    }
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