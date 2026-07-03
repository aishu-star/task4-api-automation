const { test, expect } = require('@playwright/test');

// Phase 3 from the test plan: functional tests covering the full CRUD cycle.
// Note: jsonplaceholder is a mock API - writes are simulated and not persisted,
// but the response contract (status code + echoed/generated fields) is still
// worth verifying, since a real backend is expected to honor the same contract.

test.describe('Functional tests: CRUD cycle', () => {
  test('POST /posts creates a resource and echoes submitted fields', async ({ request }) => {
    const payload = { title: 'QA test title', body: 'QA test body', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body).toHaveProperty('id'); // server-generated id
  });

  test('PUT /posts/1 fully replaces the resource', async ({ request }) => {
    const payload = { id: 1, title: 'Replaced title', body: 'Replaced body', userId: 1 };
    const res = await request.put('/posts/1', { data: payload });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
  });

  test('PATCH /posts/1 partially updates the resource', async ({ request }) => {
    const res = await request.patch('/posts/1', { data: { title: 'Patched title only' } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Patched title only');
    expect(body).toHaveProperty('id', 1);
  });

  test('DELETE /posts/1 returns 200', async ({ request }) => {
    const res = await request.delete('/posts/1');
    expect(res.status()).toBe(200);
  });
});
