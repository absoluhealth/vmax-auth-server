module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define(
    "Tenant",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      identifier: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      sso_provider: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      tableName: "tenants",
    }
  );

  Tenant.associate = function (models) {
    Tenant.hasMany(models.User, {
      foreignKey: "tenant_id",
      as: "users",
    });
    Tenant.belongsTo(models.Tenant, {
      foreignKey: "app_id",
      as: "applications",
    });
  };

  return Tenant;
};
