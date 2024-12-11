const e = require("express");
const Tenant = require("../models").Tenant;

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

// Create a method to insert new tenant
const createTenant = async (tenant) => {
  const newTenant = await Tenant.create(tenant);
  if (tenant.apps && tenant.apps.length > 0) {
    for (const app of tenant.apps) {
      await mappingService.createMapping(app);
    }
  }

  return newTenant;
};

// Create a method to update the tenant
const updateTenant = async (tenant) => {
  const newTenant = await Tenant.update(tenant, {
    where: {
      id: tenant.id,
    },
  });

  return newTenant;
};

// Create a method to delete the tenant by id
const deleteTenant = async (id) => {
  const tenant = await Tenant.destroy({
    where: {
      id: id,
    },
  });

  return tenant;
};

module.exports = {
  isValidTenant,
  isValidTenantOrigin,
  getAllTenant,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
};
