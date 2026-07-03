const { test, expect } = require('@playwright/test');

// Phase 4: boundary tests - zero, negative, and edge-of-range values.

test.describe('Boundary tests', () => {
  test('GET /posts/0 (below the valid id range) returns 404', async ({ request }) => {
    const res = await request.get('/posts/0');
    expect(res.status()).toBe(404);
  });

  test('GET /posts/-1 (negative id) returns 404', async ({ request }) => {
    const res = await request.get('/posts/-1');
    expect(res.status()).toBe(404);
  });

  test('GET /posts/100 (last valid id in the dataset) returns 200', async ({ request }) => {
    const res = await request.get('/posts/100');
    expect(res.status()).toBe(200);
  });

  test('GET /posts/101 (one past the last valid id) returns 404', async ({ request }) => {
    const res = await request.get('/posts/101');
    expect(res.status()).toBe(404);
  });

  test('GET /posts?userId=1 filters correctly and every result matches the filter', async ({ request }) => {
    const res = await request.get('/posts?userId=1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
    for (const post of body) {
      expect(post.userId).toBe(1);
    }
  });
});
