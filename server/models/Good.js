const { NULL } = require('node-sass');
const { DataTypes } = require('sequelize');

const sequelize = require('../database/database');
const Comment = require('./Comment');
const Image = require('./Image')
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
    },
    {
        // Other model options go here
        tableName: 'goods',
        timestamps: true, // add createdAt and updatedAt
    }
);

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

Good.hasMany(Image, {
    as: 'images',
    foreignKey: {name : 'goodImgId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Image.belongsTo(Good, {
    as: 'Good',
    foreignKey: {name : 'goodImgId', defaultValue: null},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Good;
