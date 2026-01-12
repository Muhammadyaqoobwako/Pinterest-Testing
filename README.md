# Pinterest Testing - SQE Project

Automated testing suite for Pinterest.com using Playwright framework.

## 📋 Project Overview

This project contains comprehensive automated tests for Pinterest website, focusing on:
- **Security Testing**: CSP headers, HSTS, TLS protocols, X-Frame-Options
- **Page Functionality**: Meta tags, viewport settings, navigation
- **Page Object Model (POM)**: Structured test architecture using page objects

## 🛠️ Technologies Used

- **Playwright** - Modern end-to-end testing framework
- **JavaScript** - Programming language
- **Page Object Model** - Design pattern for test automation

## 📁 Project Structure

```
Pinterest-Testing/
├── pages/
│   ├── loginPage.js          # Login page object
│   ├── Pages.js              # Home page object
│   ├── searchBarPage.js      # Search bar page object
│   └── securitypage.js       # Security testing page object
├── tests/
│   ├── MisamTC.spec.js       # Misam's test cases
│   └── Yaqoob's-TestCases.spec.js  # Yaqoob's test cases
├── playwright.config.js       # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Muhammadyaqoobwako/Pinterest-Testing.git
cd Pinterest-Testing
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npx playwright install
```

## ▶️ Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run specific test file:**
```bash
npx playwright test tests/Yaqoob's-TestCases.spec.js
```

**Run tests in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run tests in UI mode:**
```bash
npx playwright test --ui
```

**View test report:**
```bash
npx playwright show-report
```

## 🧪 Test Cases Included

### Yaqoob's Test Cases (15 tests)

#### Security Tests (5)
1. ✅ CSP (Content Security Policy) header validation
2. ✅ HSTS (HTTP Strict Transport Security) header check
3. ✅ TLS protocol verification
4. ✅ X-Frame-Options header (clickjacking protection)
5. ✅ No insecure scripts loaded (mixed content check)

#### Page Tests (10)
6. ✅ Meta tags validation (title & description)
7. ✅ Favicon presence and validity
8. ✅ HTML language attribute check
9. ✅ Viewport meta tag validation
10. ✅ Homepage meta description (POM)
11. ✅ Homepage explore navigation (POM)
12. ✅ LoginPage navigation (POM)
13. ✅ HTTPS usage verification (POM)
14. ✅ SecurityPage CSP validation (POM)
15. ✅ Login button visibility check

## 📊 Test Reports

After running tests, HTML reports are automatically generated in the `playwright-report/` folder.

## 👥 Contributors

- **Yaqoob** - Test automation engineer
- **Misam** - Test automation engineer

## 📄 License

This project is created for educational purposes as part of Software Quality Engineering coursework.

## 🔗 Links

- [Playwright Documentation](https://playwright.dev/)
- [Pinterest Website](https://www.pinterest.com)

---

**Note:** This is a testing project and is not affiliated with Pinterest Inc.
