const request = require("supertest");
const express = require("express");
const {
  getApps,
  getApp,
  createApp,
  updateApp,
  deleteApp,
} = require("../../src/controllers/app.controller");

const appService = require("../../src/services/application.service");
const { logger, successResponse, errorResponse } = require("../../src/helpers");

// Create an Express app and use your controller functions
const app = express();
app.use(express.json());
app.get("/app", getApps);
app.get("/app/:id", getApp);
app.post("/app", createApp);
app.put("/app", updateApp);
app.delete("/app/:id", deleteApp);

// Mock the App model
jest.mock("../../src/services/application.service");
jest.mock("../../src/helpers/index");
jest.mock("../../src/helpers");

// Set up the mocks
beforeEach(() => {
  jest.clearAllMocks();
});

describe("App Functions", () => {
  test("should get all Apps", async () => {
    const mockApp = [
      {
        id: 1,
        name: "Sample1",
        client_id: "123",
        client_secret: "123",
        display_name: "display1",
        app_url: "http://localhost:5200",
        status: "active",
      },
      {
        id: 2,
        name: "vmax",
        client_id: "1234",
        client_secret: "1234",
        display_name: "display2",
        app_url: "http://localhost:4200",
        status: "active",
      },
    ];

    appService.getAllApps.mockResolvedValue(mockApp);

    const response = await request(app).get("/app");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockApp);
  });

  test("should get App by id", async () => {
    const mockApp = {
      id: 1,
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "display1",
      app_url: "http://localhost:5200",
      status: "active",
    };

    appService.getAppById.mockResolvedValue(mockApp);

    const response = await request(app).get("/app/1");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockApp);
  });

  test("should create App", async () => {
    const mockApp = {
      id: 1,
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "display1",
      app_url: "http://localhost:5200",
      status: "active",
    };

    appService.createApp.mockResolvedValue(mockApp);

    const response = await request(app).post("/app").send(mockApp);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockApp);
  });

  test("should update App", async () => {
    const mockApp = {
      id: 1,
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "display1",
      app_url: "http://localhost:5200",
      status: "active",
    };

    appService.updateApp.mockResolvedValue(mockApp);

    const response = await request(app).put("/app").send(mockApp);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockApp);
  });

  test("should delete App", async () => {
    const mockApp = {
      id: 1,
      name: "Sample1",
      client_id: "123",
      client_secret: "123",
      display_name: "display1",
      app_url: "http://localhost:5200",
      status: "active",
    };

    appService.deleteApp.mockResolvedValue(1);
    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );

    const response = await request(app).delete("/app/1");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual("App deleted.");

    expect(appService.deleteApp).toHaveBeenCalledWith(1);
  });
});
