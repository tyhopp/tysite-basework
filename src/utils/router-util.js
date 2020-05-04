import { xhr } from './xhr-util';
import { prefetchNextPageData } from './prefetch-util';

(() => {
  const getPages = () => {
    const main = document.querySelector('main');
    const pages = Array.from(main.children);
    return pages;
  }

  const hidePages = () => {
    const pages = getPages();
    for (const page of pages) {
      page.hidden = true;
    }
  }

  const showPage = targetPage => {
    const pages = getPages();
    
    if (!pages.length) {
      return false;
    }

    let targetTagName = `page-${targetPage}`;
    let targetPageName = targetPage;
    const targetPageParts = targetPage.split('/');

    if (targetPageParts.length > 1) {
      targetTagName = 'page-note'; // TODO - Generalize this
      targetPageName = targetPageParts[targetPageParts.length - 1];
    }

    const idsMatch = (page, targetPageName) => {
      const id = page.getAttribute('id');
      if (!id) {
        return true; // If no id, implicit true
      }
      return id === targetPageName;
    }

    for (const page of pages) {
      const tagsMatch = page.tagName.toLowerCase() === targetTagName;
      if (tagsMatch && idsMatch(page, targetPageName)) {
        page.hidden = false;
        if (typeof page.setState === 'function') {
          page.setState();
        }
        return true;
      }
    }
  }

  const createPage = page => {
    const main = document.querySelector('main');
    const pageElem = document.createElement(`page-${page}`);
    main.appendChild(pageElem);
    return pageElem;
  }

  const setPageData = (pageElem, data) => {
    try {
      const json = JSON.parse(data);
      if (typeof pageElem.setData === 'function') {
        pageElem.setData(json);
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

    // Start page resolution
    let page = path === '/' ? 'index' : path.substr(1);

    // Check if is prerendering
    const params = new URLSearchParams(window.location.search);
    const isPrerendering = !!params.get('prerender');
    const prerenderRoute = params.get('prerender');
    if (prerenderRoute) {
      page = prerenderRoute;
    }

    // Remove old template
    hidePages();

    // If page exists already, show that and call it a day
    const shown = showPage(page);
    if (shown) {
      return;
    }

    // Check if is sub route
    const routeParts = page.split('/');
    if (routeParts.length > 1) {
      const note = 'note'; // TODO - Generalize this
      const pageName = routeParts[routeParts.length - 1];
      import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../sub-pages/${note}`).then(() => {
        const pageElem = createPage(note);
        xhr(`${pageName}-data.json`).then(data => {
          setPageData(pageElem, data);
          if (typeof pageElem.setState === 'function') {
            pageElem.setState();
          }
        }).then(() => {
          dispatchEvent(new CustomEvent('basework-complete', { bubbles: true }));
        });
      });
      return;
    }

    // Fetch bundle and render template
    import(/* webpackChunkName: "[request]", webpackInclude: /\.js$/ */ `../pages/${page}`).then(() => {
      const pageElem = createPage(page);
      xhr(`${page}-data.json`).then(data => {
        setPageData(pageElem, data);
        if (typeof pageElem.setState === 'function') {
          pageElem.setState();
        }
        prerenderNextPages(pageElem, !isPrerendering);
      }).then(() => {
        dispatchEvent(new CustomEvent('basework-complete', { bubbles: true }));
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