jest.useFakeTimers();
const {
  createAPP,
  getallApps,
} = require("../../src/services/application.service");

const { Application } = require("../../src/models");

jest.mock("../../src/models", () => ({
  Application: {
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      /* mock created instance */
    }),
    update: jest.fn().mockResolvedValue({}),
    destroy: jest.fn().mockResolvedValue(1),
  },
}));

describe("Application Functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  test("should get all Application", async () => {
    const mockApp = [
      {
        id: 1,
        name: "Sample1",
        login_redirect_uri: "http://localhost:5200",
        post_logout_redirect_uri: "http://localhost:45200",
        source_url: "http://localhost:45200",
        display_name: "Sample1",
        logo: "Sample1",
        auth_server_url: "http://localhost:5200",
        metadata_url: "http://localhost:5200",
        tenant_id: 1,
      },
      {
        id: 2,
        name: "Sample2",
        login_redirect_uri: "http://localhost:5200",
        post_logout_redirect_uri: "http://localhost:45200",
        source_url: "http://localhost:45200",
        display_name: "Sample2",
        logo: "Sample2",
        auth_server_url: "http://localhost:5200",
        metadata_url: "http://localhost:5200",
        tenant_id: 2,
      },
    ];
    Application.findAll.mockResolvedValue(mockApp);

    const result = await getallApps();
    expect(Application.findAll).toHaveBeenCalledWith({ limit: 10 });
    expect(result).toEqual(mockApp);
  });

  // test("should get tenant by id", async () => {
  //   const mockTenant = {
  //     id: 1,
  //     name: "Sample1",
  //     identifier: "de391193-7d35-4cce-beb6-26c57abb1968",
  //     redirect_url: "http://localhost:5200",
  //     source_url: "http://localhost:45200",
  //     sso_provider: "azure",
  //     client_id: "123",
  //     client_secret: "123",
  //     auth_server_url: "http://localhost:5200",
  //     metadata_url: "http://localhost:5200",
  //     status: "active",
  //   };
  //   const tenantId = 1;
  //   Tenant.findByPk.mockResolvedValue(mockTenant);
  //   const result = await getTenantById(tenantId);
  //   expect(Tenant.findByPk).toHaveBeenCalledWith(tenantId);
  //   expect(result).toEqual(mockTenant);
  // });

  // test("should create a tenant", async () => {
  //   const newTenant = {
  //     name: "New Tenant",
  //     identifier: "de391193-7d35-4cce-beb6-26c57abb1968",
  //     redirect_url: "http://localhost:5200",
  //     source_url: "http://localhost:45200",
  //     sso_provider: "azure",
  //     client_id: "123",
  //     client_secret: "123",
  //     auth_server_url: "http://localhost:5200",
  //     metadata_url: "http://localhost:5200",
  //     status: "active",
  //   };
  //   const createdTenant = { id: 1, ...newTenant };
  //   Tenant.create.mockResolvedValue(createdTenant);

  //   const result = await createTenant(newTenant);
  //   expect(Tenant.create).toHaveBeenCalledWith(newTenant);
  //   expect(result).toEqual(createdTenant);
  // });

  // test("should update a tenant", async () => {
  //   const updatedTenant = {
  //     id: 1,
  //     name: "Updated Tenant",
  //     identifier: "de391193-7d35-4cce-beb6-26c57abb1968",
  //     redirect_url: "http://localhost:5200",
  //     source_url: "http://localhost:45200",
  //     sso_provider: "azure",
  //     client_id: "123",
  //     client_secret: "123",
  //     auth_server_url: "http://localhost:5200",
  //     metadata_url: "http://localhost:5200",
  //     status: "active",
  //   };
  //   Tenant.update.mockResolvedValue(updatedTenant);

  //   const result = await updateTenant(updatedTenant);
  //   console.log(result);
  //   expect(Tenant.update).toHaveBeenCalledWith(updatedTenant, {
  //     where: { id: updatedTenant.id },
  //   });
  //   expect(result).toEqual(updatedTenant);
  // });

  // test("should delete a tenant", async () => {
  //   const tenantId = 1;
  //   Tenant.destroy.mockResolvedValue(1); // Sequelize returns the number of affected rows

  //   const result = await deleteTenant(tenantId);
  //   expect(Tenant.destroy).toHaveBeenCalledWith({ where: { id: tenantId } });
  //   expect(result).toEqual(1);
  // });

  // describe("isValidTenant", () => {
  //   test("should return true for a valid tenant", () => {
  //     expect(isValidTenant("1")).toBe(true);
  //   });

  //   test("should return true for another valid tenant", () => {
  //     expect(isValidTenant("2")).toBe(true);
  //   });

  //   test("should return false for an invalid tenant", () => {
  //     expect(isValidTenant("non_existent_tenant")).toBe(false);
  //   });
  // });

  // describe("isValidTenantOrigin", () => {
  //   test("should return true for a valid tenant and valid origin", () => {
  //     expect(isValidTenantOrigin("vmax", "http://localhost:4200")).toBe(true);
  //   });

  //   test("should return false for a valid tenant and invalid origin", () => {
  //     expect(isValidTenantOrigin("1", "http://invalid-origin.com")).toBe(false);
  //   });

  //   test("should return false for an invalid tenant and any origin", () => {
  //     expect(
  //       isValidTenantOrigin("non_existent_tenant", "http://localhost:4200")
  //     ).toBe(false);
  //   });

  //   test("should return false for a valid tenant but not allowed origin", () => {
  //     expect(isValidTenantOrigin("fit_dad", "http://another-origin.com")).toBe(
  //       false
  //     );
  //   });

  //   test("should return true for a valid tenant and allowed origin", () => {
  //     expect(isValidTenantOrigin("fit_dad", "http://localhost:4200")).toBe(
  //       true
  //     );
  //   });
  // });
});
