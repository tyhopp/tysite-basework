# Tysite
The personal site of Ty Hopp. See it live [here](https://tyhopp.com).

## Usage
- `git checkout https://github.com/tyhopp/basework.git`
- `cd tysite && npm i`
- `npm run start`
- Open [http://localhost:8000](http://localhost:8000)

## Lambda functions
- [bear-to-contentful](./functions/bear-to-contentful/README.md), a lambda function that lets me write in [Bear](https://bear.app) and publish to [Contentful](https://contentful.com). Check out the blog post about [how it's built](https://tyhopp.com/notes/aws-lambda-functions-in-netlify).

## Tools
  - [Basework](https://github.com/tyhopp/basework), a framework built concurrently with this site
  - [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), specifically the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) portion
  - [Custom properties](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

## Notes
- This version of the site is a complete rewrite of [tysite-gatsby](https://github.com/tyhopp/tysite-gatsby), a prior version written with a completely different set of tools.
- The content for this site is stored in Contentful, so if you clone or fork this repo and run it, it may break. However, the source code can still be useful as a reference.