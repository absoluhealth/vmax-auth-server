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
      login_redirect_uri: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("value"));
        },
        set: function (value) {
          this.setDataValue("value", JSON.stringify(value));
        },
      },
      post_logout_redirect_uri: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("value"));
        },
        set: function (value) {
          this.setDataValue("value", JSON.stringify(value));
        },
      },
      source_url: {
        type: DataTypes.STRING,
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
    },
    {
      tableName: "applications",
    }
  );
  Application.associate = function (models) {
    Application.belongsTo(models.Tenant, {
      foreignKey: "tenant_id",
      as: "tenants",
    });
  };
  return Application;
};
