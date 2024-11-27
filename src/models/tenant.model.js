const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
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
  };
  const options = {};
  return sequelize.define("Tenant", attributes, options);
}
