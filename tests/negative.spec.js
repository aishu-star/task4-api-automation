const { test, expect } = require('@playwright/test');

// Phase 3 (negative half): confirms the API responds predictably to bad input
// instead of just checking that valid input works.

test.describe('Negative tests', () => {
  test('GET /posts/99999 (nonexistent id) returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });

  test('GET /posts/abc (non-numeric id) does not silently succeed with data', async ({ request }) => {
    const res = await request.get('/posts/abc');
    // A well-behaved API should reject this; jsonplaceholder returns 404 for
    // an unmatched route, which we assert explicitly rather than assuming.
    expect(res.status()).toBe(404);
  });

  test('POST /posts with an empty body does not silently create a valid resource', async ({ request }) => {
    const res = await request.post('/posts', { data: {} });
    const body = await res.json();
    // Documented limitation: this mock API does not enforce required fields,
    // so it returns 201 with an id but no title/body/userId. A real backend
    // under test should instead return 400 with a validation error here -
    // this test documents the gap rather than hiding it.
    expect(res.status()).toBe(201);
    expect(body.title).toBeUndefined();
    expect(body.body).toBeUndefined();
  });

  test('DELETE /posts/99999 (nonexistent id) does not error out', async ({ request }) => {
    const res = await request.delete('/posts/99999');
    expect(res.status()).toBe(200);
  });
});
