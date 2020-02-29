# Tysite (Webpack edition)
This site implements three key features:

### Prerendering
Makes the site:
  - As they say, *blazing fast* on first page load 🔥
  - Usuable with JavaScript disabled in the browser

### Push state routing
Makes the site:
  - More efficient because all resources are not reloaded on page load
  - Smoother because there is no flash of white as the page reloads on navigation

### Code splitting
Makes the site:
  - Leaner because resources are only loaded as they are needed
  - Intelligent because shared resources are only loaded once across the site

## Why not just use something like Gatsby or VuePress?
  - There's merit to reengineering your favorite projects to learn
  - Enjoy the killer features of other libraries with substantially fewer dependencies
  - Write your JavaScript how you want instead of working within a framework

## What else is this site built with?
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), specifically the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) portion
  - [Custom properties](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
  
## Todos
  - [x] Dynamically import pages without pre-generating the import statements
  - [ ] Prefetch functionality
  - [ ] Dynamic `<head>` swapping
  - [ ] Webpack config differentiated by environment
  - [ ] CSS bundling improvements

## Look into
  - Extraction into a framework?