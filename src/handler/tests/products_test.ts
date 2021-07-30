import request from 'supertest';
import app from '../../server';

describe('Test Products Endpoints', () => {
  it("Request '/products' should return staus 200", async () => {
    const result = await request(app)
      .get('/products')
      .send();

    expect(result.status).toBe(200);
  });
});
