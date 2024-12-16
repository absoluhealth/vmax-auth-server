const UserDTO = require("../dto/user.dto");
const userService = require("../services/user.service");
const { successResponse, errorResponse } = require("../lib/helper");
const { logger } = require("../lib/helper");

class UserController {
  static getUser(req, res) {
    try {
      const id = req.params.id;
      const user = userService.getUserById(id);
      return successResponse(req, res, user);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static getUsers(req, res) {
    try {
      const users = userService.getAllUser();
      return successResponse(req, res, users);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static createUser(req, res) {
    try {
      const user = new UserDTO(req.body);
      const newUser = userService.createUser(user);

      return successResponse(req, res, newUser);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = userService.updateUser(id, user);
      return successResponse(req, res, updatedUser);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = userService.deleteUser(id);
      return successResponse(req, res, user);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static changePassword(req, res) {}

  static resetPassword(req, res) {}
}

module.exports = UserController;
