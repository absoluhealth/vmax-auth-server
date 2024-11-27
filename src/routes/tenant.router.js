const express = require("express");
const router = express.Router();
const TenantController = require("../controllers/tenant.controller");

const SampelController = require("../controllers/sample.controller");

router
  .get("/", TenantController.getTenants)
  .get("/sample", SampelController.getSamples)
  .get("/:id", TenantController.getTenant)
  .post("/", TenantController.createTenant)
  .put("/", TenantController.updateTenant)
  .delete("/:id", TenantController.deleteTenant)
  .get("/sample/:id", SampelController.getSample)
  .post("/sample", SampelController.createSample);

module.exports = router;
