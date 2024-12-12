const UserDTO = require("../dto/user.dto");
const userAppMappingService = require("./user_app_mapping.service");
const User = require("../models").User;

const getAllUser = async () => {
  const users = await User.findAll({
    limit: 10,
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const getUserByEmail = async (email, tenantId) => {
  const user = await User.findOne({
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "user_name",
      "identity_id",
      "invalid_login_attempts",
      "is_locked",
      "tenant_id",
    ],
    where: {
      email: email,
      tenant_id: tenantId,
    },
  });

  return user;
};

const updateUser = async (id, user) => {
  const result = await User.update(
    user, // Values to update
    { where: { id: id } }
  );

  return result;
};

const deleteUser = async (id) => {
  const result = await User.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  user.app_map_ids.forEach((element) => {
    userAppMappingService.createUserAppMapping({
      user_id: newUser.id,
      app_id: element,
    });
  });

  return newUser;
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  createUser,
};
