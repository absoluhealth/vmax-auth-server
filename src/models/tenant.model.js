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
      redirect_url: { type: DataTypes.STRING, allowNull: false },
      source_url: { type: DataTypes.STRING, allowNull: false },
      sso_provider: { type: DataTypes.STRING, allowNull: false },
      client_id: { type: DataTypes.STRING, allowNull: false },
      client_secret: { type: DataTypes.STRING, allowNull: false },
      auth_server_url: { type: DataTypes.STRING, allowNull: true },
      metadata_url: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false },
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
    Tenant.hasMany(models.Application, {
      foreignKey: "tenant_id",
      as: "applications",
    });
  };

  return Tenant;
};
