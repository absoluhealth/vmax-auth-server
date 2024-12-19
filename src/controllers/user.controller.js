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

  static async getUsers(req, res) {
    try {
      const users = await userService.getAllUser();
      return successResponse(req, res, users);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static async createUser(req, res) {
    try {
      const user = new UserDTO(req.body);
      const newUser = await userService.createUser(user);

      return successResponse(req, res, newUser);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = await userService.updateUser(id, user);
      return successResponse(req, res, updatedUser);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.deleteUser(id);
      return successResponse(req, res, user);
    } catch (error) {
      logger.error(error);
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = UserController;
