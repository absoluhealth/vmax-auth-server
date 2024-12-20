const appService = require("../services/application.service");
const { successResponse, errorResponse } = require("../lib/helper");
const { logger } = require("../helpers");

const session = {};

const getApps = async (req, res) => {
  try {
    const app = await appService.getAllApps();

    return successResponse(req, res, app);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch apps.");
  }
};

const getApp = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const app = await appService.getAppById(id);
    return successResponse(req, res, app);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot fetch App.");
  }
};

const createApp = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.createApp(app);
    return successResponse(req, res, newApp);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot create App.");
  }
};

const updateApp = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.updateApp(app);
    return successResponse(req, res, newApp);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot update App.");
  }
};

const deleteApp = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = await appService.deleteApp(id);
    if (status == 0) {
      return successResponse(req, res, "App not found.");
    }
    if (status == 1) {
      return successResponse(req, res, "App deleted.");
    }
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, "Cannot delete App.");
  }
};

const getTest = async (req, res) => {
  try {
    const app = req.headers.host;

    return successResponse(req, res, app);
  } catch (error) {
    logger.error(error);
    return errorResponse(req, res, error);
  }
};

module.exports = {
  getApps,
  getApp,
  createApp,
  updateApp,
  deleteApp,
  getTest,
};
