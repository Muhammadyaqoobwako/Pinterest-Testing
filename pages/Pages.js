class HomePage {
    constructor(page) {
      this.page = page;
    this.exploreLink = '[data-test-id="ideas-tab"]';  // stable selector
      this.watchLink = '[data-test-id="unauth-header"] >> text=Watch';
      this.metaDescription = 'meta[name="description"]';
    }
  
    async navigate() {
      await this.page.goto('https://www.pinterest.com');
    }
  
  async clickExplore() {
    // Wait until the Explore tab is visible and clickable
    const explore = this.page.locator(this.exploreLink);
    await explore.waitFor({ state: 'visible' });
    await explore.click();
  }
  
    async clickWatch() {
      await this.page.locator(this.watchLink).click();
    }
  
    async getMetaTags() {
      const title = await this.page.title();
      const description = await this.page.locator(this.metaDescription).getAttribute('content');
      return { title, description };
    }
  }
  
  class ExplorePage {
    constructor(page) {
      this.page = page;
      this.exploreButton = '[data-test-id="explore-button-search"]';
      this.searchInput = '[data-test-id="search-box-input"]';
    }
  
    async clickExploreButton() {
      await this.page.locator(this.exploreButton).click();
    }
  
    async enterSearchQuery(query) {
      await this.page.locator(this.searchInput).click();
      await this.page.locator(this.searchInput).fill(query);
      await this.page.locator(this.searchInput).press('Enter');
    }
  }
  
  class VideoPage {
    constructor(page) {
      this.page = page;
      this.videoLink = '[data-test-id="unauth-header"] >> text=Watch';
      this.signUpButton = 'button[role="button"]:has-text("Sign up")';
      this.settingsLabel = '[aria-label="Setting"]';
    }
  
    async navigateToVideos() {
      await this.page.goto('https://www.pinterest.com/videos/');
    }
  
    async clickSignUp() {
      await this.page.locator(this.signUpButton).click();
    }
  
    async openSettings() {
      await this.page.locator(this.settingsLabel).click();
    }
  }
  
  // Export all classes for use in test cases
  module.exports = { HomePage, ExplorePage, VideoPage };
  