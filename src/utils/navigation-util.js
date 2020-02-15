// TODO - Write a custom push state implementation inspired by Gatsby/Reach Router
(() => {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.target !== '_blank') {
      e.preventDefault();
      const state = anchor.state
        ? JSON.parse(anchor.state)
        : {};
      window.___navigate(anchor.href, state); // Use Gatsby's wrapper of Reach Router
    }
  });
})();