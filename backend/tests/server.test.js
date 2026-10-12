const request = require('supertest');
const app = require('../server');

describe('BHUKH LAGI Backend Server Tests', () => {
  test('GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.app).toBe('BHUKH LAGI Backend Service');
    expect(res.body.timestamp).toBeDefined();
  });

  test('GET / unknown api route returns 404', async () => {
    const res = await request(app).get('/api/payment/create-order');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('API route not found');
  });

  test('GET / serves index.html for root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('BHUKH LAGI');
  });
});
