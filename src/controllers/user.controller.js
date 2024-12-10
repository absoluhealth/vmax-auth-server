const userService = require("../services/user.service");

class UserController {
  static getUser(req, res) {
    const user = userService.getUserById(req.params.id);

    res.json(user);
  }

  static getAllUsers(req, res) {
    const users = userService.getAllUsers();

    users = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
    ];

    res.json(users);
  }

  static createUser(req, res) {
    res.json({});
  }

  static updateUser(req, res) {
    res.json({});
  }

  static deleteUser(req, res) {
    res.json(user);
  }

  static changePassword(req, res) {
    res.json(user);
  }

  static resetPassword(req, res) {
    res.json(user);
  }
}

module.exports = UserController;
