const { DataTypes } = require('sequelize');
const sequelize = require('./../database/database');

const Image = sequelize.define(
    'Image',
    {
        iamgeId: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'imiages',
        timestamps: true, // add createdAt and updatedAt
    }
);

// Associations

module.exports = Image;
