const appService = require("../services/application.service");
const { successResponse, errorResponse } = require("../lib/helper");
const { logger } = require("../lib/helper");

const session = {};

const getMappings = async (req, res) => {
  try {
    const app = await appService.getallApps();
    return successResponse(req, res, app);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch apps.");
  }
};

const getMapping = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const app = await appService.getAppById(id);
    return successResponse(req, res, app);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch apps.");
  }
};

const createMapping = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.createApp(app);
    return successResponse(req, res, newApp);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot create App.");
  }
};

const updateMapping = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.updateApp(app);
    return successResponse(req, res, newApp);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot update App.");
  }
};

const deleteMapping = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = await appService.deleteApp(id);
    if (status == 0) {
      return successResponse(req, res, "App not found.", 404);
    }
    if (status == 1) {
      return successResponse(req, res, "App deleted.");
    }
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot delete App.");
  }
};

module.exports = {
  getMappings,
  getMapping,
  createMapping,
  updateMapping,
  deleteMapping,
};
