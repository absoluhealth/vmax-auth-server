module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
      },
      identity_id: {
        type: DataTypes.STRING,
      },
      invalid_login_attempts: { type: DataTypes.TINYINT, defaultValue: 0 },
      is_locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      tenant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tenants", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_name", "tenant_id", "identity_id"],
        },
      ],
    },
    {
      tableName: "users",
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.Tenant, {
      foreignKey: "tenant_id",
      as: "tenants",
    });
  };
  return User;
};
