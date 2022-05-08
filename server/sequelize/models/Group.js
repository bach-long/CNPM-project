const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Group = sequelize.define(
        'Group',
        {
            groupId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            groupName: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Other model options go here
            tableName: 'groups',
            timestamps: false, // add createdAt and updatedAt
        }
    );
    return Group;
};
// Associations
