const { DataTypes } = require('sequelize');
const sequelize = require('./../database/database');

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
    as: 'comments',
    foreignKey: 'cmtImgId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Image.belongsTo(Comment, {
    as: 'Comment',
    foreignKey: 'cmtImgId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
// Associations

module.exports = Comment;
