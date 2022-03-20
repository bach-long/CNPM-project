const { DataTypes } = require('sequelize');
const sequelize = require('./../database/database');

const Comment = sequelize.define(
    'Comment',
    {
        commentId: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'comments',
        timestamps: true, // add createdAt and updatedAt
    }
);

// Associations

module.exports = Comment;
