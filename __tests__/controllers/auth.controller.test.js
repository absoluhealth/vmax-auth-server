const request = require("supertest");
const express = require("express");
const { login, doLogin } = require("../../src/controllers/auth.controller");
const authService = require("../../src/services/auth.service");

const app = express();
app.use(express.json());
app.get("/login", login);
app.post("/login", doLogin);

jest.mock("../../src/services/auth.service");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Auth Functions", () => {
  test("should return 403 if appId is missing", async () => {
    const response = await request(app).get(
      "/login?redirectUrl=http://localhost:4200/home"
    );
    expect(response.statusCode).toBe(403);
    expect(response.body).toBe("Invalid Request. App Id is missing");
  });

  test("should return 403 if redirectUrl is missing", async () => {
    const response = await request(app).get("/login?appId=1");
    expect(response.statusCode).toBe(403);
    expect(response.body).toBe("Invalid Request. Redirect URL is missing");
  });

  test("should return 403 if validateAppId returns an error", async () => {
    authService.validateAppId.mockResolvedValue("App is not active");

    const response = await request(app).get(
      "/login?appId=1&redirectUrl=http://localhost:4200/home"
    );
    expect(response.statusCode).toBe(403);
    expect(response.body).toBe("App is not active");
  });

  //   test("should return 200 if login is successful", async () => {
  //     authService.validateAppId.mockResolvedValue("");

  //     const response = await request(app).get(
  //       "/login?appId=1&redirectUrl=http://localhost:4200/home"
  //     );
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBe(200);
  //   });
});
