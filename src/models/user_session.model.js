module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define(
    "UserSession",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      identifier: {
        type: DataTypes.STRING,
      },
      user: {
        type: DataTypes.JSON,
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
      tableName: "user_sessions",
    }
  );
  UserSession.associate = function (models) {
    // associations can be defined here
  };
  return UserSession;
};
