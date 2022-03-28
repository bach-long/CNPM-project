const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Tag = require('./Tag');
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
        timestamps: true, // add createdAt and updatedAt
    }
);

Group.hasMany(Tag, {
    as: 'tags',
    foreignKey: {name : 'groupId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Tag.belongsTo(Group, {
    as: 'Group',
    foreignKey: {name : 'groupId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
// Associations

module.exports = Group;