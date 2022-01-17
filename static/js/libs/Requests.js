export default class Requests {
  constructor(root) {
    this.root = root;
  }

  checkSlashOnEndpoint(endpoint) {
    endpoint = endpoint.split('');
    if (endpoint[0] !== '/') {
      endpoint.unshift('/');
    }
    return endpoint.join('');
  }

  async postData(data = {}, endpoint) {
    endpoint = this.checkSlashOnEndpoint(endpoint);
    const response = await fetch(`${this.root}${endpoint}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      ContentSecurityPolicy:
        "default-src 'self' gap:; script-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; object-src *; style-src 'self' data: 'unsafe-inline'; img-src 'self' data:; media-src 'self' data:; font-src 'self' data:; connect-src *",
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getData(endpoint) {
    endpoint = this.checkSlashOnEndpoint(endpoint);
    console.log(`${this.root}${endpoint}`);
    const response = await fetch(`${this.root}${endpoint}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      contentSecurityPolicy:
        "default-src 'self' gap:; script-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; object-src *; style-src 'self' data: 'unsafe-inline'; img-src 'self' data:; media-src 'self' data:; font-src 'self' data:; connect-src *",
    });
    return response.json();
  }
}
