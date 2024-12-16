const userAppMappingService = require("../services/user_app_mapping.service");
const { successResponse, errorResponse } = require("../lib/helper");
const { logger } = require("../lib/helper");

class UserAppMappingController {
  static createUserAppMapping(req, res) {
    try {
      const userAppMapping = req.body;
      const newUserAppMapping =
        userAppMappingService.createUserAppMapping(userAppMapping);
      return successResponse(req, res, newUserAppMapping);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static deleteUserAppMapping(req, res) {
    try {
      const id = req.params.id;
      const userAppMapping = userAppMappingService.deleteUserAppMapping(id);
      return successResponse(req, res, userAppMapping);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = UserAppMappingController;
