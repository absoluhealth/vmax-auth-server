const UserDTO = require("../dto/user.dto");
const userService = require("../services/user.service");

class UserController {
  static getUser(req, res) {
    try {
      const id = req.params.id;
      const user = userService.getUserById(id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static getAllUsers(req, res) {
    try {
      const users = userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static createUser(req, res) {
    try {
      const user = new UserDTO(req.body);
      const newUser = userService.createUser(user);

      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = userService.updateUser(id, user);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = userService.deleteUser(id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static changePassword(req, res) {}

  static resetPassword(req, res) {}
}

module.exports = UserController;
