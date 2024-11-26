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
    return res.send(error.message);
  }
};

const getTenant = async (req, res) => {
  try {
    const id = req.params.id;
    const sample = await tenantService.getTenantById(id);
    return res.send(sample);
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot fetch Tenant.");
  }
};

module.exports = { getTenants, getTenant };
