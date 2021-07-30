import request from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user_model';

const user = new UserStore();

describe('Test User Endpoints', () => {
  it("Request '/user' should return staus 500", async () => {
    // Add new user to get token
    const u = await user.createUser({
        first_name: "first",
        last_name: "last",
        username: "test_user",
        password: "xxxxx"
    });

    const result = await request(app)
      .get(`/user/${u.id}`)
      .send();

    console.log(u.token)

    expect(result.status).toBe(500);
  });
});
