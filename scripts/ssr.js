const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ssr = async routes => {
  for (const route in routes) {
    const file = routes[route];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Output page console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Enable request interception
    await page.setRequestInterception(true);

    // Set correct url paths to html files
    page.on('request', request => {
      if (request.resourceType() === 'script') {
        const filename = /\/\/\/(.*)/.exec(request.url())[1];
        request.continue({
          url: `file:${path.resolve('dist', filename)}`
        });
      } else {
        request.continue();
      }
    });
    
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

module.exports = ssr;