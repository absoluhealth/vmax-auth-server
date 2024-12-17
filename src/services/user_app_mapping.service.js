const UserAppMapping = require("../models").UserAppMapping;

const createUserAppMapping = async (userAppMapping) => {
  const newUserAppMapping = await UserAppMapping.create(userAppMapping);

  return newUserAppMapping;
};

const deleteUserAppMapping = async (id) => {
  const deletedUserAppMapping = await UserAppMapping.destroy({
    where: { id: id },
  });

  return deletedUserAppMapping;
};

const GetMappingsByUserId = async (userId) => {
  const mappings = await UserAppMapping.findAll({
    where: { user_id: userId },
  });

  return mappings;
};

module.exports = {
  createUserAppMapping,
  deleteUserAppMapping,
  GetMappingsByUserId,
};
