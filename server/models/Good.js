const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');

const sequelize = require('./../database/database');
const User = require('./User');
const Comment = require('./Comment');

const Good = sequelize.define(
    'Good',
    {
        goodId: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        isSold: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'goods',
        timestamps: true, // add createdAt and updatedAt
    }
);

// Associations
Good.hasMany(Comment, { as: 'comments', foreignKey: 'goodId' });
Comment.belongsTo(Good, { as: 'Good', foreignKey: 'goodId' });

module.exports = Good;
