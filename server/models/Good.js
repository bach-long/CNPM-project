const { DataTypes } = require('sequelize');

const sequelize = require('../database/database');
const Comment = require('./Comment');
const Image = require('./Image');
<<<<<<< HEAD
const Tag = require('./Tag');
=======

>>>>>>> 435a7685e30a10eb305cb850825b26199dce4658
const Good = sequelize.define(
    'Good',
    {
        goodId: {
            type: DataTypes.INTEGER(11),
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
        bookmarkersCount: {
            // Get this user's followers count using sequelize literal
            type: DataTypes.VIRTUAL(DataTypes.INTEGER, [
                [
                    sequelize.literal(
                        `(SELECT COUNT(*) FROM users_bookmarks WHERE users_bookmarks.goodId = Good.goodId)`
                    ),
                    'bookmarkersCount',
                ],
            ]),
        },
        isBookmarkedByCurrentUser: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        // Other model options go here
        tableName: 'goods',
        timestamps: true, // add createdAt and updatedAt
    }
);

Good.prototype.setIsBookmarkedByCurrentUser = async function (user) {
    const bookmarkers = await this.getBookmarker();
    this.isBookmarkedByCurrentUser =
        bookmarkers.find((bookmarker) => bookmarker.userId === user.userId) !==
        undefined;
};

// Associations
Good.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'goodId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Comment.belongsTo(Good, {
    as: 'Good',
    foreignKey: 'goodId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Good.hasMany(Image, {
    as: 'images',
    foreignKey: { name: 'goodImgId', defaultValue: null },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Image.belongsTo(Good, {
    as: 'Good',
    foreignKey: { name: 'goodImgId', defaultValue: null },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Good.hasMany(Tag, {
    as: 'tags',
    foreignKey: {name : 'goodId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Tag.belongsTo(Good, {
    as: 'Good',
    foreignKey: {name : 'goodId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Good;
