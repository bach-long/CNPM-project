const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ChatContext = sequelize.define(
        'ChatContext',
        {
            chatContextId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true
            },
            conversationId: {
                type: DataTypes.INTEGER(11),
            },
            username: {
                type: DataTypes.STRING(50),
            },
            context: {
                type: DataTypes.STRING(500),
            }
        },
        {
            tableName: 'chatcontexts',
            timestamps: true,
        }
    );
    return ChatContext;
};