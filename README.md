# Tysite (Webpack edition)
Implementing modern web practices with minimal dependencies. Inspired by Gatsby.

## Features
#### Prerendering
An SPA without the drawbacks of an SPA:
  - Understandable to search engine crawlers (yay, SEO)
  - Usuable with JavaScript disabled in the browser
  - As they say, *blazing fast* on first page load 🔥

#### Push state routing
Navigation using native browser APIs:
  - Avoids loading all resources each page needs on each navigation
  - Removes flash of white as the page reloads on navigation

#### Code splitting
Loads only what you need when you need it:
  - Fewer overall network requests == less bandwidth used
  - Shared resources only loaded once across the site

## Why not just use something like Gatsby or VuePress?
  - Understand how other projects work by building your own
  - Enjoy killer features other projects offer with substantially fewer dependencies
  - Write your JavaScript how you want instead of working within a framework

## What is this site built with?
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), specifically the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) portion
  - [Custom properties](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
  
## Todos
  - [x] Dynamically import pages on navigation
  - [x] CSS bundling improvements
  - [x] Base template `<head>` href interpolation
  - [x] Implement prefetching with Babel parser, traverse and generate
  - [x] Flatten Contentful content models
  - [x] Create markdown parser build step with [unified](https://unifiedjs.com)
  - [x] Refactor async in prefetch and transform step
  - [ ] Migrate remaining React components to web components
  - [ ] Fix kinks in webpack-dev-server
  - [ ] Fix flicker on navigate
  - [ ] Webpack config differentiated by environment
  - [ ] Prefetch/preload links
  - [ ] Find a solution for dependencies with vulnerabilities

## Look into
  - Extraction into a generalized project