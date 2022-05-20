const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Image = sequelize.define(
        'Image',
        {
            imageId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            link: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'images',
            timestamps: false,
        }
    );

    return Image;
};
