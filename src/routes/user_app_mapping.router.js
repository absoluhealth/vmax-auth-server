const express = require("express");
const router = express.Router();
const UserAppMappingController = require("../controllers/user_app_mapping.controller");

router
  .post("/", UserAppMappingController.createUserAppMapping)
  .delete("/:id", UserAppMappingController.DeleteUserAppMapping);

module.exports = router;
