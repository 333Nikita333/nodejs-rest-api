const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models/userMongoose");
const { DB_HOST } = process.env;

describe("Register Controller", () => {
  beforeAll(async () => {
    // Connect to MongoDB database before running tests
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnecting from the database after running tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clearing the user collection after running tests
    await User.deleteMany();
  });

  // Test for checking status code 201 during registration
  test("register should return status code 201", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "test@example.com",
      password: "password",
      subscription: "starter",
    });

    expect(response.status).toBe(201);
  });

  // Test for checking the return of an object with email and
  // subscription fields and data type "String" during registration
  test("register should return user object with email and subscription", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "test@example.com",
      password: "password",
      subscription: "starter",
    });

    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
