module.exports = (sequelize, DataTypes) => {
  const AppTenantMapping = sequelize.define(
    "AppTenantMapping",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      login_redirect_uri: {
        type: DataTypes.STRING,
      },
      post_logout_redirect_uri: {
        type: DataTypes.STRING,
      },
      source_url: {
        type: DataTypes.STRING,
      },
      display_name: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.BLOB("long"),
      },
      auth_server_url: {
        type: DataTypes.STRING,
      },
      metadata_url: {
        type: DataTypes.STRING,
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tenants", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
      },
      app_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "applications", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      tableName: "app_tenant_mapping",
    }
  );
  AppTenantMapping.associate = function (models) {
    AppTenantMapping.belongsTo(models.Tenant, {
      foreignKey: "tenant_id",
      as: "tenants",
    });
    AppTenantMapping.belongsTo(models.AppTenantMapping, {
      foreignKey: "app_id",
      as: "applications",
    });
  };
  return AppTenantMapping;
};
