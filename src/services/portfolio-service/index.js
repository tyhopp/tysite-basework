class PortfolioService {

  getPortfolioItems() {
    const base = 'https://api.contentful.com';
    const path = `spaces/${CONTENTFUL_SPACE}/environments/master`;
    const contentType = 'content_types/portfolioItem';
    const accessToken = `access_token?${process.env.CONTENTFUL_TOKEN}`;
    const url = `${base}/${path}/${contentType}/${accessToken}`;
    
    return fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json());
  }
}

export default new PortfolioService();