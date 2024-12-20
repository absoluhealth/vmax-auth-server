const express = require("express");
const router = express.Router();

const AppController = require("../controllers/app.controller");

router
  .get("/test/", AppController.getTest)
  .get("/", AppController.getApps)
  .get("/:id", AppController.getApp)
  .post("/", AppController.createApp)
  .put("/", AppController.updateApp)
  .delete("/:id", AppController.deleteApp);

module.exports = router;
