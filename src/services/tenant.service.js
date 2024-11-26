const e = require("express");
const Tenant = require("../models").sso_multi_tenant;

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

  if (tenant.alowedOrigins[origin] && tenant.alowedOrigins[origin] == true)
    return true;
  else return false;
};

const getAllTenant = async () => {
  const Tenants = await Tenant.findAll({
    limit: 10,
  });

  return Tenants;
};

// create a method to get tenant by id
const getTenantById = async (id) => {
  const tenant = await Tenant.findByPk(id);

  return tenant;
};

module.exports = {
  isValidTenant,
  isValidTenantOrigin,
  getAllTenant,
  getTenantById,
};
