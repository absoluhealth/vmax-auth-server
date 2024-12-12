const request = require("supertest");
const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../../src/controllers/user.controller");

const TenantModel = require("../../src/services/user.service");
const { logger, successResponse, errorResponse } = require("../../src/helpers");
const e = require("express");

// Create an Express app and use your controller functions
const app = express();
app.use(express.json());
app.get("/user", getUsers);
app.get("/user/:id", getUser);
app.post("/user", createUser);
app.put("/user", updateUser);
app.delete("/user/:id", deleteUser);

// Mock the Tenant model
jest.mock("../../src/services/user.service");
jest.mock("../../src/helpers/index");
jest.mock("../../src/helpers");

// Set up the mocks
beforeEach(() => {
  jest.clearAllMocks();
});

describe("User Functions", () => {
  test("should get all User", async () => {
    const mockUser = [
      {
        id: 1,
        email: "rv@gmail.com",
        first_name: "Ravi",
        last_name: "Kumar",
        phone: "1234567890",
        user_name: "rv@gmail.com",
        identity_id: "123",
        invalid_login_attempts: 0,
        is_locked: false,
        is_deleted: false,
        last_login: "2021-07-27T15:00:00.000Z",
      },
      {
        id: 2,
        email: "mano@gmail.com",
        first_name: "Mano",
        last_name: "Kumar",
        phone: "1234567890",
        user_name: "1234567890",
        identity_id: "123",
        invalid_login_attempts: 0,
        is_locked: false,
        is_deleted: false,
        last_login: "2021-07-27T15:00:00.000Z",
      },
    ];
    TenantModel.getAllUser.mockResolvedValue(mockUser);
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
  });
  test("should get User by id", async () => {
    const mockUser = {
      id: 1,
      email: "rv@gmail.com",
      first_name: "Ravi",
      last_name: "Kumar",
      phone: "1234567890",
      user_name: "rv@gmail.com",
      identity_id: "123",
      invalid_login_attempts: 0,
      is_locked: false,
      is_deleted: false,
      last_login: "2021-07-27T15:00:00.000Z",
    };
    TenantModel.getUserById.mockResolvedValue(mockUser);
    const response = await request(app).get("/user/1");
    expect(response.statusCode).toBe(200);
  });
  test("should create User", async () => {
    const mockUser = {
      id: 1,
      email: "rv@gmail.com",
      first_name: "Ravi",
      last_name: "Kumar",
      phone: "1234567890",
      user_name: "rv@gmail.com",
      identity_id: "123",
      app_map_ids: [1, 2, 3],
    };
    TenantModel.createUser.mockResolvedValue(mockUser);
    const response = await request(app).post("/user").send(mockUser);
    expect(response.statusCode).toBe(200);
  });
  test("should update User", async () => {
    const mockUser = {
      id: 1,
      email: "rv@gmail.com",
      first_name: "Ravi",
      last_name: "Kumar",
      phone: "1234567890",
      user_name: "rv@gmail.com",
      identity_id: "123",
      app_map_ids: [1, 2, 3],
    };
    TenantModel.updateUser.mockResolvedValue(mockUser);
    const response = await request(app).put("/user").send(mockUser);
    expect(response.statusCode).toBe(200);
  });
  test("should delete User", async () => {
    const mockUser = {
      id: 1,
      email: "rv@gmail.com",
      first_name: "Ravi",
      last_name: "Kumar",
      phone: "1234567890",
      user_name: "rv@gmail.com",
      identity_id: "123",
    };
    TenantModel.deleteUser.mockResolvedValue(mockUser);
    const response = await request(app).delete("/user/1");
    expect(response.statusCode).toBe(200);
  });
});
