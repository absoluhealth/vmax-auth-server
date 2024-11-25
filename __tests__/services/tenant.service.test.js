const {
  isValidTenant,
  isValidTenantOrigin,
} = require("../../src/services/tenant.service");

describe("Tenant Functions", () => {
  describe("isValidTenant", () => {
    test("should return true for a valid tenant", () => {
      expect(isValidTenant("1")).toBe(true);
    });

    test("should return true for another valid tenant", () => {
      expect(isValidTenant("2")).toBe(true);
    });

    test("should return false for an invalid tenant", () => {
      expect(isValidTenant("non_existent_tenant")).toBe(false);
    });
  });

  describe("isValidTenantOrigin", () => {
    test("should return true for a valid tenant and valid origin", () => {
      expect(isValidTenantOrigin("vmax", "http://localhost:4200")).toBe(true);
    });

    test("should return false for a valid tenant and invalid origin", () => {
      expect(isValidTenantOrigin("1", "http://invalid-origin.com")).toBe(false);
    });

    test("should return false for an invalid tenant and any origin", () => {
      expect(
        isValidTenantOrigin("non_existent_tenant", "http://localhost:4200")
      ).toBe(false);
    });

    test("should return false for a valid tenant but not allowed origin", () => {
      expect(isValidTenantOrigin("fit_dad", "http://another-origin.com")).toBe(
        false
      );
    });

    test("should return true for a valid tenant and allowed origin", () => {
      expect(isValidTenantOrigin("fit_dad", "http://localhost:4200")).toBe(
        true
      );
    });
  });
});
