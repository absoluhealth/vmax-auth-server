module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define("Sample", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
  Sample.associate = function (models) {
    // associations can be defined here
  };
  return Sample;
};
