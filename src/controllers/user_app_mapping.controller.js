const userAppMappingService = require("../services/user_app_mapping.service");

class UserAppMappingController {
  static createUserAppMapping(req, res) {
    try {
      const userAppMapping = req.body;
      const newUserAppMapping =
        userAppMappingService.createUserAppMapping(userAppMapping);
      return res.json(newUserAppMapping);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static deleteUserAppMapping(req, res) {
    try {
      const id = req.params.id;
      const userAppMapping = userAppMappingService.deleteUserAppMapping(id);
      return res.json(userAppMapping);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserAppMappingController;
