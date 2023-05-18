const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models/userMongoose");
const { DB_HOST } = process.env;

describe("Register Controller", () => {
  beforeAll(async () => {
    // Подключение к базе данных перед запуском тестов
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Очистка коллекции пользователей после выполнения тестов
    await User.deleteMany();
    // Отключение от базы данных после выполнения тестов
    await mongoose.connection.close();
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
      email: "test2@example.com",
      password: "password",
      subscription: "starter",
    });

    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  // Test for checking status code 200 during login
  test("login should return status code 200", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
  });

  // Does the login controller returns a user token with a String data type.
  test("login should return a token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");
  });

  // Test for checking the return of an object with email and
  // subscription fields and data type "String" during login
  test("login should return user object with email and subscription", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
