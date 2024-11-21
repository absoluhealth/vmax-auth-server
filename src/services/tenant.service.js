const tenants = [
  {
    tenantId: "1",
    name: "vmax",
    secretCode: "1234567891",
    alowedOrigins: {
      "http://localhost:4200": true,
    },
    apps: ["crm", "app"],
  },
  {
    tenantId: "2",
    name: "fit_dad",
    secretCode: "fitdad",
    alowedOrigins: {
      "http://localhost:4200": true,
    },
    apps: ["crm", "fitdad_app"],
  },
];

const isValidTenant = (tenantId, origin) => {
  tenant = tenants.find((a) => a.tenantId == tenantId);

  return tenant != null;
};

const isValidTenantOrigin = (tenantName, origin) => {
  tenant = tenants.find((a) => a.name == tenantName);

  if (!tenant) return false;

  return tenant.alowedOrigins[origin] && tenant.alowedOrigins[origin] == true;
};

module.exports = {
  isValidTenant,
  isValidTenantOrigin,
};
