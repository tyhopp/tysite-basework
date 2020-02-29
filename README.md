# Tysite (Webpack edition)
Reengineering the killer features of Gatsby without React.

## Features
#### Prerendering
Build an SPA without the drawbacks of an SPA. Benefits:
  - Understandable to search engine crawlers (yay, SEO)
  - Usuable with JavaScript disabled in the browser
  - As they say, *blazing fast* on first page load 🔥

#### Push state routing
Navigate using native browser APIs. Benefits:
  - Avoids loading all resources each page needs on each navigation
  - Removes flash of white as the page reloads on navigation

#### Code splitting
Load only what you need when you need it. Benefits:
  - Fewer overall network requests == less bandwidth used
  - Shared resources only loaded once across the site

## Why not just use something like Gatsby or VuePress?
  - Understand deeply how other projects work by building your own
  - Enjoy killer features other projects offer with substantially fewer dependencies
  - Write your JavaScript how you want instead of working within a framework

## What is this site built with?
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), specifically the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) portion
  - [Custom properties](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
  
## Todos
  - [x] Dynamically import pages without pre-generating the import statements
  - [x] CSS bundling improvements
  - [ ] Dynamic `<head>` swapping
  - [ ] Prefetch functionality
  - [ ] Webpack config differentiated by environment

## Look into
  - Extraction into a generalized project