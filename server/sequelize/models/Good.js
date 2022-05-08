const { DataTypes } = require('sequelize');

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
            brand: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            maintenance: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            details: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            color: {
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

    return Good;
};
