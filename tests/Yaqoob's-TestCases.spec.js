import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import securitypage from "../pages/securitypage";
import { HomePage} from "../pages/Pages";

const BASE = "https://www.pinterest.com";

// ----- Security tests (5) -----
test("CSP contains common directives", async ({ page }) => {
  const securityPage = new securitypage(page);
  const csp = await securityPage.verifyContentSecurityPolicy();
  expect(typeof csp).toBe("string");
  expect(csp.length).toBeGreaterThan(10);
  expect(/default-src|script-src|connect-src|img-src/.test(csp)).toBeTruthy();
});

test("HSTS header exists and has max-age", async ({ page }) => {
  const resp = await page.goto(BASE);
  const headers = resp.headers();
  const hsts = headers["strict-transport-security"];
  expect(hsts).toBeTruthy();
  expect(/max-age=\d+/.test(hsts)).toBeTruthy();
});

test("TLS protocol/security details present", async ({ page }) => {
  const resp = await page.goto(BASE);
  const sec = resp.securityDetails();
  expect(sec).toBeTruthy();
  if (sec && sec.protocol)
    expect(/TLS|TLSv|TLS 1\./.test(sec.protocol)).toBeTruthy();
});

test("X-Frame-Options present (prevent clickjacking)", async ({ page }) => {
  const resp = await page.goto(BASE);
  const headers = resp.headers();
  const xfo = headers["x-frame-options"];
  expect(typeof xfo).toBe("string");
  expect(/DENY|SAMEORIGIN/i.test(xfo)).toBeTruthy();
});

test("No insecure script src (basic mixed-content check)", async ({ page }) => {
  await page.goto(BASE);
  const insecureScript = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("script[src]")).some((s) =>
      s.src.startsWith("http:")
    );
  });
  expect(insecureScript).toBeFalsy();
});

// ----- Page tests (10) -----
test("Meta tags: title and description have expected shape", async ({
  page,
}) => {
  const home = new HomePage(page);
  await home.navigate();
  const { title, description } = await home.getMetaTags();
  expect(title).toBeTruthy();
  expect(typeof description).toBe("string");
  expect(description.length).toBeGreaterThanOrEqual(20);
});

test("Favicon href exists and is valid URL", async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  const href = await page
    .locator('link[rel~="icon"]')
    .first()
    .getAttribute("href");
  expect(href).toBeTruthy();
  expect(/^\/|^http/.test(href)).toBeTruthy();
});

test("HTML lang attribute exists and is not empty", async ({ page }) => {
  await page.goto(BASE);
  const lang = await page.evaluate(() => document.documentElement.lang || "");
  expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
});

test("Viewport meta has width and initial-scale", async ({ page }) => {
  await page.goto(BASE);
  const vw = await page
    .locator('meta[name="viewport"]')
    .getAttribute("content");
  expect(typeof vw).toBe("string");
  expect(/width/.test(vw) && /initial-scale/.test(vw)).toBeTruthy();
});


test("HomePage meta description contains text (POM)", async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  const { description } = await home.getMetaTags();
  expect(description).toBeTruthy();
  expect(description.length).toBeGreaterThan(5);
});

test("HomePage clickExplore navigates to explore (POM)", async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  const urlBefore = page.url();
  await home.clickExplore();
  const urlAfter = page.url();
  expect(urlAfter).not.toBe(urlBefore);
});


test("LoginPage navigate reaches homepage (POM)", async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  const title = await page.title();
  expect(title).toBeTruthy();
  expect(title.length).toBeGreaterThan(0);
});

test("HomePage and LoginPage both use HTTPS (POM)", async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  const url1 = page.url();
  expect(url1.startsWith("https://")).toBeTruthy();

  const login = new LoginPage(page);
  await login.navigate();
  const url2 = page.url();
  expect(url2.startsWith("https://")).toBeTruthy();
});

test("SecurityPage verifyContentSecurityPolicy returns valid string (POM)", async ({
  page,
}) => {
  const secPage = new securitypage(page);
  const csp = await secPage.verifyContentSecurityPolicy();
  expect(typeof csp).toBe("string");
  expect(csp.length).toBeGreaterThan(5);
});



test("Login button visible (sanity check for logged-out state)", async ({
  page,
}) => {
  const login = new LoginPage(page);
  await login.navigate();
  const btn = page.locator('[data-test-id="simple-login-button"]');
  await expect(btn).toBeVisible();
});
