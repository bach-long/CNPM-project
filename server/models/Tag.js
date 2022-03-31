const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Group = require('./Group');
const Tag = sequelize.define(
    'Tag',
    {
        tagId: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        tagName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        tableName: 'tags',
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

module.exports = Tag;