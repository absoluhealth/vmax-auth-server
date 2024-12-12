const request = require("supertest");
const express = require("express");
const {
  getTenant,
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} = require("../../src/controllers/tenant.controller");

const TenantModel = require("../../src/services/tenant.service");
const { logger, successResponse, errorResponse } = require("../../src/helpers");
const e = require("express");

// Create an Express app and use your controller functions
const app = express();
app.use(express.json());
app.get("/tenant", getTenants);
app.get("/tenant/:id", getTenant);
app.post("/tenant", createTenant);
app.put("/tenant", updateTenant);
app.delete("/tenant/:id", deleteTenant);

// Mock the Tenant model
jest.mock("../../src/services/tenant.service");
jest.mock("../../src/helpers/index");
jest.mock("../../src/helpers");

// Set up the mocks
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Tenant Functions", () => {
  test("should get all Tenant", async () => {
    const mockTenant = [
      {
        id: 1,
        name: "Sample1",
        identifier: "de391193-7d35-4cce-beb6-26c57abb1968",
        redirect_url: "http://localhost:5200",
        source_url: "http://localhost:45200",
        sso_provider: "azure",
        client_id: "123",
        client_secret: "123",
        auth_server_url: "http://localhost:5200",
        metadata_url: "http://localhost:5200",
        status: "active",
      },
      {
        id: 2,
        identifier: "de391193-7d35-4cce-beb6-26c57abb1968",
        name: "vmax",
        redirect_url: "http://localhost:4200",
        source_url: "http://localhost:4200",
        sso_provider: "google",
        client_id: "1234",
        client_secret: "1234",
        auth_server_url: "http://localhost:4200",
        metadata_url: "http://localhost:4200",
        status: "active",
      },
    ];

    TenantModel.getAllTenant.mockResolvedValue(mockTenant);

    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );
    const response = await request(app).get("/tenant");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTenant);
    expect(TenantModel.getAllTenant).toHaveBeenCalled();
  });

  test("should get a single Tenant", async () => {
    const mockTenant = {
      id: 1,
      name: "Sample1",
      sso_provider: "azure",
      status: "active",
      apps: [],
    };

    TenantModel.getTenantById.mockResolvedValue(mockTenant);

    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );
    const response = await request(app).get("/tenant/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTenant);
    expect(TenantModel.getTenantById).toHaveBeenCalledWith(1);
  });

  test("should create a Tenant", async () => {
    const mockTenant = {
      id: 1,
      name: "Sample1",
      sso_provider: "azure",
      status: "active",
      apps: [],
    };

    TenantModel.createTenant.mockResolvedValue(mockTenant);

    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );
    const response = await request(app).post("/tenant").send(mockTenant);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTenant);
    expect(TenantModel.createTenant).toHaveBeenCalledWith(mockTenant);
  });

  test("should update a Tenant", async () => {
    const mockTenant = {
      id: 1,
      name: "Sample1",
      sso_provider: "azure",
      status: "active",
      apps: [],
    };

    TenantModel.updateTenant.mockResolvedValue(mockTenant);

    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );
    const response = await request(app).put("/tenant").send(mockTenant);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTenant);
    expect(TenantModel.updateTenant).toHaveBeenCalledWith(mockTenant);
  });

  test("should delete a Tenant", async () => {
    const mockTenant = {
      id: 1,
      name: "Sample1",
      sso_provider: "azure",
      status: "active",
      apps: [],
    };

    TenantModel.deleteTenant.mockResolvedValue(1);

    successResponse.mockImplementation((req, res, data) =>
      res.status(200).json(data)
    );
    const response = await request(app).delete("/tenant/1");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Tenant deleted successfully.");
    expect(TenantModel.deleteTenant).toHaveBeenCalledWith(1);
  });

  test("should return error when get all Tenant fails", async () => {
    TenantModel.getAllTenant.mockRejectedValue(
      new Error("Cannot fetch Tenants.")
    );

    errorResponse.mockImplementation((req, res, data) =>
      res.status(500).json(data)
    );
    const response = await request(app).get("/tenant");
    expect(response.status).toBe(500);
    console.log(response.error);
    expect(response.error.text).toEqual("Cannot fetch Tenants.");
    expect(TenantModel.getAllTenant).toHaveBeenCalled();
  });
});
