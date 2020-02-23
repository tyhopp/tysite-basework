const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ssr = async pathname => {
  const file = pathname === '/' ? 'index' : path;
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

  // Log all failed requests
  // page.on('requestfailed', request => {
  //   console.log(`REQUEST FAILURE: ${request.url()} ${request.failure().errorText}`);
  // });
  
  await page.goto(`file:${path.resolve('dist', `${file}.html`)}`, { waitUntil: 'networkidle0' })
  const html = await page.content();
  await browser.close();

  fs.writeFile(`${path.resolve('dist', `${file}.html`)}`, html, error => {
    if (error) throw error;
  });

  return;
}

module.exports = ssr;