const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
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
            timestamps: false, // add createdAt and updatedAt
        }
    );
    return Tag;
}