const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Image = require('./Image');

const Comment = sequelize.define(
    'Comment',
    {
        commentId: {
            type: DataTypes.INTEGER(11),
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

Comment.hasMany(Image, {
    as: 'images',
    foreignKey: { name: 'cmtImgId', defaultValue: null },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Image.belongsTo(Comment, {
    as: 'Comment',
    foreignKey: { name: 'cmtImgId', defaultValue: null },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
// Associations

module.exports = Comment;
