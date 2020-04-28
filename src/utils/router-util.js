import { xhr } from './xhr-util';
import { prefetchNextPageData } from './prefetch-util';

(() => {
  const removePages = () => {
    const main = document.querySelector('main');
    if (main.children.length) {
      Array.from(main.children).forEach(child => child.remove());
    }
  }

  const createPage = page => {
    const main = document.querySelector('main');
    const pageElem = document.createElement(`page-${page}`);
    main.appendChild(pageElem);
    return pageElem
  }

  const setPageData = (page, data) => {
    try {
      const json = JSON.parse(data);
      if (page.setData && typeof page.setData === 'function') {
        page.setData(json);
      }
    } catch (error) {
      console.error('Failed to parse page data', error);
    }
  }

  const prerenderNextPages = (page, shouldPrerender) => {
    if (shouldPrerender) {
      try {
        prefetchNextPageData(page);
      } catch (error) {
        console.warn('Failed to prefetch next page data', error);
      }
    }
  }

  const navigate = path => {

    // Start route resolution
    let route = path;

    // Check if is prerendering
    const params = new URLSearchParams(window.location.search);
    const isPrerendering = !!params.get('prerender');
    const prerenderRoute = params.get('prerender');
    if (prerenderRoute) {
      route = prerenderRoute;
    }

    // Remove old template
    removePages();

    // Check if is sub route
    const routeParts = route.split('/');
    if (routeParts.length > 1) {
      const note = 'note'
      const pageName = routeParts[routeParts.length - 1];
      import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../sub-pages/${note}`).then(() => {
        const page = createPage(note);
        xhr(`${pageName}-data.json`).then(data => {
          setPageData(page, data);
        });
      });
      return;
    }

    // Fetch bundle and render template
    import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../pages/${route}`).then(() => {
      const page = createPage(route);
      xhr(`${route}-data.json`).then(data => {
        setPageData(page, data);
        prerenderNextPages(page, !isPrerendering);
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