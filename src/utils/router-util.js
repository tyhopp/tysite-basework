import index from 'pages/index/index.js';
import notes from 'pages/notes/notes.js';

(() => {
  const routes = {
    '/': index,
    '/notes': notes
  }

  const navigate = path => {

    const currentPage = document.querySelector('[page]');

    // TODO - Don't allow routing to same internal path
    // TODO - Improve this check
    if (currentPage instanceof HTMLElement) {
      currentPage.remove();
    }

    routes[path].render();
  }

  navigate(window.location.pathname);

  window.addEventListener('popstate', () => {
    console.log(`Navigating to ${window.location.pathname}`);
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