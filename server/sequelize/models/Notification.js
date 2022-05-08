const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Notification = sequelize.define(
        'Notification',
        {
            NotificationId: {
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
            tableName: 'notifications',
            timestamps: true,
        }
    );

    return Notification;
};