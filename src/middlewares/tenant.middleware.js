const tenantService = require("../services/tenant.service");

//checks if tenant is valid
const tenantChecker = (req, res, next) => {
  const tenantId = req.headers["app-id"];

  const { redirectUrl } = req.query;

  if (!tenantService.isValidTenant(tenantId, redirectUrl)) {
    return res.status(403).json({
      message:
        "Access Denied. You're not allowed to access the VMax SSO server. ",
    });
  }

  next();
};

const tenantAndOriginChecker = (req, res, next) => {
  const tenantId = req.headers["tenant-id"];

  const { redirectUrl } = req.query;

  if (!tenantService.isValidTenantOrigin(tenantId, redirectUrl)) {
    return res.status(403).json({
      message:
        "Access Denied. You're not allowed to access the VMax SSO server. ",
    });
  }

  next();
};

module.exports = {
  tenantChecker,
  tenantAndOriginChecker,
};
