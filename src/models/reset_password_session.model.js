module.exports = (sequelize, DataTypes) => {
  const ResetPasswordSession = sequelize.define(
    "ResetPasswordSession",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sessionId: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      appId: {
        type: DataTypes.INTEGER,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "reset_password_sessions",
    }
  );
  ResetPasswordSession.associate = function (models) {
    // associations can be defined here
  };
  return ResetPasswordSession;
};
