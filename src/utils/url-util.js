/**
 * Parses a url string into relevant parts.
 * @param {string} url 
 * @return {Object}
 */
function getUrlParts(url) {
  let a = document.createElement('a');
  a.href = url;

  return {
    href: a.href,
    host: a.host,
    hostname: a.hostname,
    port: a.port,
    pathname: a.pathname,
    protocol: a.protocol,
    hash: a.hash,
    search: a.search
  };
}

export {
  getUrlParts
}