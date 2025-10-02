<div align="center">

# Chronomelon Playwright Starter

[![CI](https://github.com/jeffreyreijnen/chronomelon-playwright-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/jeffreyreijnen/chronomelon-playwright-starter/actions/workflows/ci.yml)

</div>

## Overview

Professional Playwright starter (TypeScript) that showcases UI + API testing with Page Object Model, stable selectors, network stubbing, and production-grade GitHub Actions CI with artifacts (HTML report, traces, videos).

Highlights:
- **UI E2E**: Sauce Demo login, cart, checkout, sorting
- **Components**: The Internet file upload, JS alerts, dynamic controls, basic auth
- **API**: ReqRes GET/POST/negative
- **POM**: Clean page classes and methods
- **Stability**: `getByRole`/`getByLabel`/`getByTestId` selectors
- **Artifacts**: HTML report, traces, videos on failure

## Tech Stack

- **Language**: TypeScript (Node 20+)
- **Runner**: Playwright Test
- **Reporting**: HTML (built-in). Optional Allure scaffold.
- **Quality**: ESLint + Prettier, Husky + lint-staged
- **Env**: dotenv
- **CI**: GitHub Actions (browser matrix)

## Quick Start

```bash
npm i
npm run install:browsers
cp .env.example .env
npm test
npm run report
```

## Project Structure

```
chronomelon-playwright-starter/
  .github/workflows/ci.yml
  config/
    playwright.config.ts
    env.ts
  fixtures/
    users.ts
    testData.ts
  pages/
    saucedemo/
      LoginPage.ts
      InventoryPage.ts
      CartPage.ts
      CheckoutPage.ts
  tests/
    ecommerce/
      login.spec.ts
      cart.spec.ts
      checkout.spec.ts
      sorting.spec.ts
    components/
      file-upload.spec.ts
      js-alerts.spec.ts
      dynamic-controls.spec.ts
      basic-auth.spec.ts
    api/
      users-api.spec.ts
      users-api-negative.spec.ts
  utils/
    helpers.ts
    selectors.ts
```

## Running in CI & Artifacts

CI runs on Ubuntu for Chromium, Firefox, and WebKit. On failures, Playwright uploads the HTML report and `test-results` (traces/videos) as artifacts.

Open the report locally:

```bash
npm run report
### Optional: Allure Reporter

Enable Allure by setting `ENABLE_ALLURE=true` in `.env`. Then run tests; results will be generated in `allure-results/`.

To view with the Allure CLI (optional):

```bash
npx allure-commandline generate allure-results --clean -o allure-report
npx allure-commandline open allure-report
```

### Screenshots / Trace

See `docs/` for example screenshots of the HTML report and Trace Viewer.
```

## Design Choices

- **POM** improves readability and maintainability
- **Stable selectors** prefer roles/labels/test IDs
- **Waits** via `expect().toHave*` assertions; avoid arbitrary timeouts
- **Env** driven base URLs (`.env.example` provided)
- **Retries** enabled in CI only; traces on first retry

## Adapt to Your App

1. Update `BASE_URL_*` in `.env`
2. Add new page objects under `pages/`
3. Add fixtures under `fixtures/`
4. Write tests under `tests/`

## Limitations & Next Steps

- Optional Allure reporter scaffold included (disable by default)
- Consider Dockerfile using Playwright base image for deterministic runs
- Visual regression could be added with Playwright snapshots

## License

MIT © 2025 Jeffrey Reijnen



