const tenantService = require("../services/tenant.service");

const session = {};

const getTenants = async (req, res) => {
  try {
    const sample = await tenantService.getAllTenant();
    //return successResponse(req, res, sample);
    return res.send(sample);
  } catch (error) {
    // logger.error(error);
    // return errorResponse(req, res, "Cannot fetch samples.");
    return res.status(500).send("Cannot fetch Tenants.");
  }
};

const getTenant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sample = await tenantService.getTenantById(id);
    return res.send(sample);
  } catch (error) {
    // logger.error(error);
    return res.status(500).send("Cannot fetch Tenant.");
  }
};

// Create a method to insert new tenant
const createTenant = async (req, res) => {
  try {
    const tenant = req.body;
    const newTenant = await tenantService.createTenant(tenant);
    return res.send(newTenant);
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot create Tenant.");
  }
};

// Create a method to update the tenant
const updateTenant = async (req, res) => {
  try {
    const tenant = req.body;
    const newTenant = await tenantService.updateTenant(tenant);
    return res.send(newTenant);
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot update Tenant.");
  }
};

// Create a method to delete the tenant
const deleteTenant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = await tenantService.deleteTenant(id);
    if (status == 0) {
      return res.send("Tenant not found.");
    }
    if (status == 1) {
      return res.send("Tenant deleted successfully.");
    }
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot delete Tenant.");
  }
};

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
