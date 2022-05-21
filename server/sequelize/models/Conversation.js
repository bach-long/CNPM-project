const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Conversation = sequelize.define(
        'Conversation',
        {
            conversationId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            username1: {
                type: DataTypes.STRING(50),
            },
            username2: {
                type: DataTypes.STRING(50),
            },
        },
        {
            tableName: 'conversations',
            timestamps: true,
        }
    );
    return Conversation;
};
