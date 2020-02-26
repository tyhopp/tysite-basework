const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Runs Puppeteer to prerender all pages so that:
 *  - The site is usable with JavaScript disabled
 *  - Loading times are as fast as possible
 */
const prerender = async () => {
  // Only require routes after its created
  const routes = require('../..//src/routes'); // TODO - Refactor

  for (const route in routes) {
    const file = routes[route];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Output page console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text(), msg.location().url));

    // Enable request interception
    await page.setRequestInterception(true);

    // Set correct url paths to html files
    page.on('request', request => {
      switch(request.resourceType()) {
        case 'image':
        case 'media':
        case 'font':
        case 'script':
          const filename = /\/\/\/(.*)/.exec(request.url())[1];
          request.continue({
            url: `file:${path.resolve('dist', filename)}`
          });
          break;
        default:
          request.continue();
          break;
      }
    });

    // For debugging requests
    // page.on('requestfailed', request => {
    //   console.log(request.url() + ' ' + request.failure().errorText);
    // });
    
    await page.goto(`file:${path.resolve('dist', `${file}.html?prerender=${file}`)}`, { waitUntil: 'networkidle0' });
    const html = await page.content();
    await browser.close();

    fs.writeFile(`${path.resolve('dist', `${file}.html`)}`, html, error => {
      if (error) throw error;
      console.log(`Prerendered ${file}`);
    });
  }

  return;
}

module.exports = prerender;