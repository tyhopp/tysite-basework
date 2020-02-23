(() => {
  // Create header
  document.body.appendChild(document.createElement('ty-header'));

  // Create main
  const main = document.createElement('main');
  main.dataset.page = '';
  document.body.appendChild(main);
})();