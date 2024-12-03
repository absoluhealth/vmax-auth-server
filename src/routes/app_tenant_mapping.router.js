const express = require("express");
const router = express.Router();

const AppController = require("../controllers/app_tenant_map.controller");

router
  .get("/", AppController.getMappings)
  .get("/:id", AppController.getMapping)
  .post("/", AppController.createMapping)
  .put("/", AppController.updateMapping)
  .delete("/:id", AppController.deleteMapping);

module.exports = router;
