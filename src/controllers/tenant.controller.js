const tenantInputModel = require("../dto/tenant.dto");
const tenantService = require("../services/tenant.service");
const mappingService = require("../services/app_tenant_mapping.service");
const { successResponse, errorResponse } = require("../lib/helper");
const { logger } = require("../lib/helper");

const session = {};

const getTenants = async (req, res) => {
  try {
    const tenant = await tenantService.getAllTenant();

    return successResponse(req, res, tenant);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch tenant.");
  }
};

const getTenant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tenant = await tenantService.getTenantById(id);
    return successResponse(req, res, tenant);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch Tenant.");
  }
};

// Create a method to insert new tenant
const createTenant = async (req, res) => {
  try {
    const tenant = new tenantInputModel.TenantDTO(req.body);

    const newTenant = await tenantService.createTenant(tenant);
    return successResponse(req, res, newTenant);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot create Tenant.");
  }
};

// Create a method to update the tenant
const updateTenant = async (req, res) => {
  try {
    const tenant = req.body;
    const newTenant = await tenantService.updateTenant(tenant);
    return successResponse(req, res, newTenant);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot update Tenant.");
  }
};

// Create a method to delete the tenant
const deleteTenant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = await tenantService.deleteTenant(id);
    if (status == 0) {
      return successResponse(req, res, "Tenant not found.", 404);
    }
    if (status == 1) {
      return successResponse(req, res, "Tenant deleted successfully.");
    }
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot delete Tenant.");
  }
};

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
