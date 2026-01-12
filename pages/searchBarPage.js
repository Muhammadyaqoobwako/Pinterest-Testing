class searchBarPage{
    constructor(page) {
      this.page = page;
      this.searchInput = '[data-test-id="search-box-input"]'; // Search input selector
      this.searchResultLink = 'a[data-test-id="search-result-link"]'; // Search result link
      this.filterButton = '[data-test-id="search-filter-button"]'; // Filter button
      this.boardsButton = '[data-test-id="filter-boards-button"]'; // Boards filter button
    }
  
  
    async navigate() {
      await this.page.goto('https://www.pinterest.com/');
    }
  
    async enterSearchQuery(query) {
      await this.page.locator(this.searchInput).click();
      await this.page.locator(this.searchInput).fill(query);
      await this.page.locator(this.searchInput).press('Enter');
    }
  }
  
  module.exports = searchBarPage;
  