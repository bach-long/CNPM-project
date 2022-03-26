const { DataTypes } = require('sequelize');
const { set } = require('../app');

const sequelize = require('./../database/database');
const Comment = require('./Comment');

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

module.exports = Good;
