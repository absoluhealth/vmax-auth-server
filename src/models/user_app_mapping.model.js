module.exports = (sequelize, DataTypes) => {
  const UserAppMapping = sequelize.define(
    "UserAppMapping",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
      },
      app_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "app_tenant_mapping", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
      },
    },
    {
      tableName: "user_app_mapping",
    }
  );
  UserAppMapping.associate = function (models) {
    UserAppMapping.belongsTo(models.UserAppMapping, {
      foreignKey: "app_id",
      as: "app_tenant_mapping",
    });
    UserAppMapping.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return UserAppMapping;
};
