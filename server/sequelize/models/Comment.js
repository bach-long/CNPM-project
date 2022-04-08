const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
            tableName: 'comments',
            timestamps: true,
        }
    );

    return Comment;
};
