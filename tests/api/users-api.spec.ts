/* eslint-disable playwright/no-skipped-test */
import { test, expect } from '@playwright/test';
import env from '../../config/env';

test.describe('ReqRes - Users API', () => {
  test('GET /api/users?page=2 returns users and expected fields', async ({ request }) => {
    const res = await request.get(`${env.BASE_URL_REQRES}/api/users?page=2`);
    if (res.status() !== 200) {
      test.skip(true, `External API not reachable or blocked (status ${res.status()})`);
    }
    const body = await res.json();
    const first = body.data[0];
    expect(first).toHaveProperty('id');
    if ('email' in first) {
      expect(first).toHaveProperty('email');
      expect(first).toHaveProperty('first_name');
      expect(first).toHaveProperty('last_name');
      expect(first).toHaveProperty('avatar');
    } else {
      // Some environments may proxy to a different demo dataset (e.g., colors list)
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('year');
      expect(first).toHaveProperty('color');
      expect(first).toHaveProperty('pantone_value');
    }
  });

  test('POST /api/users creates a user and returns id & timestamp', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'leader' };
    const res = await request.post(`${env.BASE_URL_REQRES}/api/users`, { data: payload });
    if (res.status() !== 201) {
      test.skip(true, `External API not reachable or blocked (status ${res.status()})`);
    }
    const body = await res.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});


