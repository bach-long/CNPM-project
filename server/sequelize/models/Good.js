const { DataTypes } = require('sequelize');
const removeVietnameseTones = require('./../../utils/removeVietnameseTones')

module.exports = (sequelize) => {
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
            nameNormalized: {
                type: DataTypes.STRING,
                allowNull: true,
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
                allowNull: true,
            },
            brand: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            maintenance: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            details: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            color: {
                type: DataTypes.STRING(50),
                allowNull: true,
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
            tableName: 'goods',
            timestamps: true,
        }
    );

    Good.prototype.setIsBookmarkedByCurrentUser = async function (user) {
        const bookmarkers = await this.getBookmarker();
        this.isBookmarkedByCurrentUser =
            bookmarkers.find(
                (bookmarker) => bookmarker.userId === user.userId
            ) !== undefined;
    };

    const normalizeName = (good, options) => {
        good.nameNormalized = removeVietnameseTones(good.name).replace(/ /g, '').toLowerCase();
    }

    Good.beforeCreate(normalizeName);
    Good.beforeUpdate(normalizeName);

    return Good;
};
