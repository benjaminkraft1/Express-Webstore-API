import request from 'supertest';
import app from '../../server';

describe('Test Orders Endpoints', () => {
  it("Request '/current_orders/' should return staus 500", async () => {
    const result = await request(app)
      .get('/current_orders/1')
      .send();

    expect(result.status).toBe(500);
  });
});
