# Tysite (Webpack edition)
This site implements the three features that make [Gatsby](https://gatsbyjs.org) a compelling tool without React:

  - Prerendering (or SSR in the build step)
  - Push state routing
  - Code splitting/prefetching

## Features
The next sections provide some context for each feature. The concepts blend into one another, so the order is important.

### Prerendering
If you build your site or app as a single page app (SPA), you have a problem with search engine optimization (SEO). The search engine web crawlers that index your site can't read SPAs well (except for maybe Google's) because everything is dynamically loaded via JavaScript at runtime. This means one main `index.html` file, and all other "pages" are loaded via a "router" to make it look like your navigating the web in the old way but somehow faster.

One way to solve this is to prerender all pages during the build step. The idea is after your site is bundled and individual html files are generated for each page, use a headless browser to load and execute all the JavaScript scripts on each page. This gives us two advantages:
  
  - Our load times will be, as they say, *blazing fast*
  - If the user disables JavaScript, the site is still usable

> Check out [Google's article about rendering on the web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web) for more on prerendering and similar solutions.

### Push state routing
Push state routing, or something similar, is pretty much what all major router libraries boil down to. If the native browser routing mechanism is this:
  
  - Click on a link
  - Refresh the page
  - Load the new page

Then the goal of push state routing is to cut out the middle step and achieve:

  - Click on a link
  - Load the new page

The browser's [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) and [popstate event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event) make this mechanism possible natively.

Rather than use a library, this site implements [a simple custom router](src/utils/router-util.js) that uses the History API and popstate event under the hood.

> Check out [Reach Router's source](https://github.com/reach/router/blob/master/src/lib/history.js) to see how the authors use the same APIs in the browser.
> [Router5](https://router5.js.org/introduction/core-concepts), another major library, does something different, but pretty similar.

Push state routing gives us:

  - Better performance because all reused resources are not reloaded
  - Better user experience because there is no flash of white as the page reloads on navigation

### Code splitting/prefetching
Code splitting/prefetching are two mechanisms that address how we can only load resources as they're needed by the page. In the native browser experience, every page loads all resources needed for that page, regardless of whether other pages have already loaded. With SPAs we have another problem, which is because we have one main entry point, often `index.html` that loads `index.js`, its very easy to load all resources for the entire app in `index.js`. As our app grows, the performance declines because we load everything all at once, instead of bit by bit as needed.

There are a few different ways to achieve code splitting, but this site does so using [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). The idea is when a user clicks a link, and the new page is loaded using push state routing, the router also dynamically imports the code required for that new page to load.

> [Webpack's code splitting guide](https://webpack.js.org/guides/code-splitting/) and [React's docs on code splitting](https://reactjs.org/docs/code-splitting.html) are great resources for this.

This gives us what we want, but we can do one step better with prefetching. Prefetching allows us to load the resources required by pages the user *might* navigate to from the current page in the background.

TODO - Implement and add description about this.

## Why not just use Gatsby?
It's really about not wanting to use React. Although React is a fantastic framework with a bustling open source community behind it, the use of the virtual DOM and other non-standard approaches gets us too far away from the real DOM and regular old web APIs. It's another layer of abstraction to grapple with and another dependency to manage. It's wonderful for so many things, but for this site, I wanted few dependencies and to be as close to web standards as possible.

The previous version of this site was happily built with Gatsby. In an effort to remove React from the equation while still keeping the great things Gatsby offers, this version of the site is built with only Webpack and Babel, and has simplified, custom implementations of the features described above.

## What else is this site built with?

  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), specifically the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) portion
  - [Custom properties](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
  
## Todos

- [ ] Dynamically create `imports.js` in the prepare build step
- [ ] Prefetch functionality
- [ ] Dynamic `<head>` swapping
- [ ] Webpack config differentiated by environment
- [ ] CSS bundling improvements

## Look into
  
  - Extraction into a framework?