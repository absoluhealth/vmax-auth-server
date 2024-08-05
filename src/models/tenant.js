const {DataTypes} = require('sequelize')


module.exports = model;

function model(sequelize){
    const attributes = {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
        },
        tenantId: {type: DataTypes.STRING, allowNull: false},
        name:  {type: DataTypes.STRING, allowNull: false}
    };
    const options = {};
    return sequelize.define('vmax_tenants', attributes, options);

}