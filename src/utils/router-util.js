import { routes } from '../routes.js';

(() => {
  const navigate = path => {
    const main = document.querySelector('main');

    // Check if is prerendering
    const params = new URLSearchParams(window.location.search);
    const prerenderRoute = params.get('prerender');
    const route = prerenderRoute
      ? prerenderRoute
      : routes[path] ? routes[path] : 'not-found';

    // Remove old template
    if (main.children.length) {
      Array.from(main.children).forEach(child => child.remove());
    }

    // Fetch bundle and render template
    import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../pages/${route}`)
      .then(() => {
        const page = document.createElement(`page-${route}`);
        main.appendChild(page);
        
        // TODO - Create caching mechanism, or decide to leave caching to browser

        const fetchPageData = url => {
          return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest;
            request.open('GET', url, true);
            request.onreadystatechange = () => {
              if (request.readyState == 4) {
                resolve(request.responseText);
              }
            }
            request.onerror = error => {
              reject(error);
            }
            request.send(null);
          });
        }
        
        fetchPageData(`/${route}-data.json`)
          .then(data => {
            try {
              const json = JSON.parse(data);
              if (page.setData && typeof page.setData === 'function') {
                page.setData(json);
              }
            } catch (error) {
              console.error('Failed to parse page data', error);
            }
          })
          .catch(error => {
            console.error('Failed to fetch page data', error);
          });
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