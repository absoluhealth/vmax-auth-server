module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      client_id: {
        type: DataTypes.STRING,
      },
      client_secret: {
        type: DataTypes.STRING,
      },
      display_name: {
        type: DataTypes.STRING,
      },
      app_url: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      tableName: "applications",
    }
  );
  Application.associate = function (models) {
    Application.hasMany(models.Tenant, {
      foreignKey: "app_id",
      as: "tenants",
    });

    Application.hasMany(models.Tenant, {
      foreignKey: "app_id",
      as: "app_tenant_mapings",
    });
  };
  return Application;
};
