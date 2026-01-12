class LoginPage {
  constructor(page) {
    this.page = page;
    // Define locators for the page elements
    this.loginButton = page.locator('[data-test-id="simple-login-button"]');
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.submitButton = page.locator('[data-test-id="registerFormSubmitButton"]');
    this.accountOptions = page.locator('[data-test-id="header-accounts-options-button"]');
    this.logoutButton = page.locator('[data-test-id="header-menu-options-logout"]');
  }

  // Method to navigate to the login page
  async navigate() {
    await this.page.goto('https://www.pinterest.com/');
    await this.page.waitForLoadState('domcontentloaded'); // Ensure the page is loaded
  }

  // Method to perform login with email and password
  async login(email, password) {
    await this.loginButton.click();
    await this.page.waitForSelector('input[placeholder="Email"]'); // Wait for email input to be visible
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('domcontentloaded'); // Wait for the page to load after login
  }


async logout() {

  await this.accountOptions.click();
  await this.logoutButton.click();
  
}


  
}

module.exports = LoginPage;
