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

module.exports = {
  createUserAppMapping,
  deleteUserAppMapping,
};
