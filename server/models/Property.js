const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Property = sequelize.define(
    'Property',
    {
        propertyId: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        propertyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
        }
    },
    {
        // Other model options go here
        tableName: 'properties',
    }
);

// Associations

module.exports = Property;