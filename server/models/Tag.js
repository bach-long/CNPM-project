const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Tag = sequelize.define(
    'Tag',
    {
        tagId: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        tagName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'tags',
        timestamps: true, // add createdAt and updatedAt
    }
);

module.exports = Tag;