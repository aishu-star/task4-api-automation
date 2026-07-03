const { test, expect } = require('@playwright/test');

// Phase 2 from the test plan: smoke tests on core happy-path endpoints.
// If any of these fail, the API is not in a usable state at all.

test.describe('Smoke tests', () => {
  test('GET /posts/1 returns 200 with expected shape', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });

  test('GET /posts returns a non-empty list', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /users/1 returns 200 with expected shape', async ({ request }) => {
    const res = await request.get('/users/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('email');
  });
});
