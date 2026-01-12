import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import searchBarPage from '../pages/searchBarPage';
import { HomePage } from '../pages/Pages';

/* ============================
   LOGIN FUNCTIONALITY
============================ */




test('Login [Valid Email And Valid Password]', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('poken24435@chansd.com', 'Misamjaff145');

  await expect(
    page.getByRole('button', { name: /log in/i })
  ).toHaveCount(0);
});

test('Login [SQL Injection Attempt]', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  // SQL injection payload
  await loginPage.login(`admin' OR '1'='1`, 'randomPassword123');

 await expect(
    page.locator('[data-test-id="simple-login-button"]')
  ).toBeVisible();
});



test('Login [Valid Email And Invalid Password]', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('poken24435@chansd.com', '123456678900');

  await expect(
    page.locator('[data-test-id="simple-login-button"]')
  ).toBeVisible();
});

test('Login [Invalid Email And Valid Password]', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('poooken1233@gmail.com', '');

  await expect(
    page.locator('[data-test-id="simple-login-button"]')
  ).toBeVisible();
});

test('Login [Invalid Email And Invalid Password]', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('ooooooop5@chansd.com', '12oop78900');

  await expect(
    page.locator('[data-test-id="simple-login-button"]')
  ).toBeVisible();
});

test('Login [No Email And No Password]', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('', '');

  await expect(
    page.locator('[data-test-id="simple-login-button"]')
  ).toBeVisible();
});



/* ============================
   HOME PAGE
============================ */

test('Page title is displayed correctly', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  const title = await page.title();
  expect(title).toBeTruthy();
});



test('Profile link should not be visible when logged out', async ({ page }) => {
  const homepage = new HomePage(page);
  await homepage.navigate();

  await expect(
    page.getByRole('link', { name: 'Your profile' })
  ).toBeHidden();
});


test('Profile link should navigate to profile page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('vicrm8grno@yzcalo.com', 'yepasshaiiska550');

  await page.getByRole('link', { name: 'Your profile' }).click();
  await expect(page).toHaveURL(/pinterest\.com\/.+/);
});





//ExplorePage



test('Saving a pin should work when logged in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
   await loginPage.login('poken24435@chansd.com', 'Misamjaff145');

  await page.locator('.KnPdox > div:nth-child(6) > div > div').click();

const saveButton = page.locator('[data-test-id="PinBetterSaveButton"]').first();
await saveButton.click();

  await saveButton.click();

  await page.getByRole('button', { name: 'Profile save' }).click();

  await expect(page.locator('[data-test-id="saved-button"]')).toBeVisible();

});


test('Testing the React Button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('vicrm8grno@yzcalo.com', 'yepasshaiiska550');
  await page.locator('.KnPdox > div:nth-child(6) > div > div').click();
  const reactButton = await page.locator('[data-test-id="react-button"]');
  await reactButton.click();
  const heartPath = reactButton.locator('svg path');
  await expect(heartPath).toHaveCSS('fill', 'rgb(221, 14, 14)');

});




// SEARCH FUNCTIONALITY.

test('Test search bar with valid query', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const SearchBarPage = new searchBarPage(page);

  await loginPage.navigate();
  await loginPage.login('lideco1578@icousd.com', 'yepasshaiiska123');
  await SearchBarPage.enterSearchQuery('new year');
    const firstPin = page.locator('.KnPdox > div:nth-child(6) > div > div').first();
    await expect(firstPin).toBeVisible({ timeout: 10000 });
});


test('Test search bar with hashtags', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const SearchBarPage = new searchBarPage(page);

  await loginPage.navigate();
  await loginPage.login('lideco1578@icousd.com', 'yepasshaiiska123');
  await SearchBarPage.enterSearchQuery('#foodie');
    const firstPin = page.locator('.KnPdox > div:nth-child(6) > div > div').first();
    await expect(firstPin).toBeVisible({ timeout: 10000 });
});

test('Test search bar with invalid query', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const SearchBarPage = new searchBarPage(page);

  await loginPage.navigate();
  await loginPage.login('lideco1578@icousd.com', 'yepasshaiiska123');
  await SearchBarPage.enterSearchQuery('*^%$&*&*%^%*&(*kikkjjkkhjh12324335');
    const firstPin = page.locator('.KnPdox > div:nth-child(6) > div > div').first();
    await expect(firstPin).toBeVisible({ timeout: 10000 });
});


test('Test search bar with emoji query', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const SearchBarPage = new searchBarPage(page);

  await loginPage.navigate();
  await loginPage.login('lideco1578@icousd.com', 'yepasshaiiska123');
  await SearchBarPage.enterSearchQuery('😊 art');
    const firstPin = page.locator('.KnPdox > div:nth-child(6) > div > div').first();
    await expect(firstPin).toBeVisible({ timeout: 10000 });
});




