const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Runs Puppeteer to prerender all pages so that:
 *  - The site is usable with JavaScript disabled
 *  - Loading times are as fast as possible
 */
const prerender = async routes => {
  for (const route in routes) {
    const file = routes[route];
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security']
    });
    const page = await browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);

    // Set correct url paths for local files
    page.on('request', request => {
      if (!request.url().startsWith('file')) {
        request.continue();
        return;
      }

      switch (request.resourceType()) {
        case 'image':
        case 'media':
        case 'font':
        case 'script':
        case 'stylesheet':
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

    // Output console logs
    page.on('console', async msg => {
      const args = await msg.args();
      args.forEach(async arg => {
        const value = await arg.jsonValue();
        // Value is serializable
        if (JSON.stringify(value) !== JSON.stringify({})) {
          console.log(`PAGE LOG: ${value}`);
        }
        // Ualue is unserializable (or an empty oject)
        else {
          console.log(`PAGE LOG: ${arg._remoteObject.description}`);
        }
      });
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

module.exports = prerender;