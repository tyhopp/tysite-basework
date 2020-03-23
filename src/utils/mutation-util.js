// Refactor

function themeObserver() {
  return new Promise((resolve, reject) => {
    const html = document.querySelector('html');

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          return resolve(html.dataset.theme);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(html, { attributes: true });
  });
}

module.exports = {
  themeObserver
}