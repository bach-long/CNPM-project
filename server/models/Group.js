const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Group = sequelize.define(
    'Group',
    {
        groupId: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        groupName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'groups',
        timestamps: true, // add createdAt and updatedAt
    }
);

// Associations

module.exports = Group;