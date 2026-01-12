class securitypage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.pinterest.com');
    }
  
    async verifyContentSecurityPolicy() {
      const response = await this.page.goto('https://www.pinterest.com');
      const headers = response.headers();
      return headers['content-security-policy'];
    }
  
    async checkSSLProtocol() {
      return await this.page.evaluate(() => window.location.protocol);
    }
  }
  
  module.exports = securitypage;
  