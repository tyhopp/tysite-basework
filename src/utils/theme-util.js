(() => {
  const colorSchemePreference = window.matchMedia('(prefers-color-scheme: dark)');
  const html = document.querySelector('html');
  html.dataset.theme = colorSchemePreference.matches ? 'dark' : 'light';
  colorSchemePreference.addListener(e => {
    html.dataset.theme = e.matches ? 'dark' : 'light';
  });
})();