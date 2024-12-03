const appService = require("../services/application.service");

const session = {};

const getMappings = async (req, res) => {
  try {
    const app = await appService.getallApps();
    //return successResponse(req, res, app);
    return res.send(app);
  } catch (error) {
    // logger.error(error);
    // return errorResponse(req, res, "Cannot fetch apps.");
    return res.status(500).send("Cannot fetch Apps.");
  }
};

const getMapping = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const app = await appService.getAppById(id);
    return res.send(app);
  } catch (error) {
    // logger.error(error);
    return res.status(500).send("Cannot fetch App.");
  }
};

const createMapping = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.createApp(app);
    return res.send(newApp);
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot create App.");
  }
};

const updateMapping = async (req, res) => {
  try {
    const app = req.body;
    const newApp = await appService.updateApp(app);
    return res.send(newApp);
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot update App.");
  }
};

const deleteMapping = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = await appService.deleteApp(id);
    if (status == 0) {
      return res.send("App not found.");
    }
    if (status == 1) {
      return res.send("App deleted.");
    }
  } catch (error) {
    // logger.error(error);
    return res.send("Cannot delete App.");
  }
};

module.exports = {
  getMappings,
  getMapping,
  createMapping,
  updateMapping,
  deleteMapping,
};
