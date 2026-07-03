# API Test Automation Demo

A working Playwright API test suite, built as a hands-on companion to a written QA testing exercise (Task 4: "You have been asked to test the system's APIs"). Rather than only describing an approach on paper, this repo demonstrates it directly against a real, public API.

## Live Test Report

View the latest test run results here, no setup required: **https://aishu-star.github.io/task4-api-automation/**

This report updates automatically every time the tests run in CI, so it always reflects the most recent state of the suite.

## Target API

[JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free, publicly available fake REST API used for testing and prototyping. It requires no authentication or API key, which makes it a stable choice for a demo that anyone can run without setup friction.

## Approach

This suite mirrors the phased approach described in the written test plan:

1. **Smoke tests** (`tests/smoke.spec.js`). Confirm the core read endpoints work at all before testing anything deeper.
2. **Functional tests** (`tests/functional.spec.js`). Full CRUD cycle: create, read, update (both full and partial), delete.
3. **Negative tests** (`tests/negative.spec.js`). Invalid IDs, non-numeric input, and an empty request body, checking the API's actual behavior rather than assuming it fails safely.
4. **Boundary tests** (`tests/boundary.spec.js`). Zero, negative, and edge-of-range ID values, plus a filter query check.

Each test uses Playwright's built-in `request` fixture, which sends real HTTP requests directly with no browser involved, exactly as described in the tools section of the written plan.

## A note on negative testing against a mock API

JSONPlaceholder simulates writes but doesn't persist them or enforce validation. For example, `POST /posts` with an empty body still returns `201 Created` instead of a `400` validation error a real backend should return. Rather than skip that case, `negative.spec.js` documents this gap explicitly in the test itself, since knowing the limits of the system under test is part of testing it honestly.

## Run It Yourself

**Option 1: In your browser, no local setup**

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/aishu-star/task4-api-automation)

Click the badge above, wait for the environment to finish building (about 30 seconds), then run in the terminal that opens:

```bash
npx playwright test
```

**Option 2: On your own machine**

```bash
git clone https://github.com/aishu-star/task4-api-automation.git
cd task4-api-automation
npm install
npx playwright test
```

View the HTML report after either option:

```bash
npm run report
```

## CI

Tests run automatically on every push and pull request via GitHub Actions (see `.github/workflows/api-tests.yml`). The HTML report is both uploaded as a build artifact and published live to GitHub Pages at the link above.
