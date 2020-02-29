import routes from '../routes.js';

(() => {
  const navigate = path => {
    const main = document.querySelector('main');

    // Check if is prerendering
    const params = new URLSearchParams(window.location.search);
    const prerenderRoute = params.get('prerender');
    const route = prerenderRoute
      ? prerenderRoute
      : routes[path] ? routes[path] : '404';

    // Remove old template
    if (main.children.length) {
      Array.from(main.children).forEach(child => child.remove());
    }

    // Fetch bundle and render template
    import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../pages/${route}`).then(() => {
      main.appendChild(document.createElement(`page-${route}`));
    });
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