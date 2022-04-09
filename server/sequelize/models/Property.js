const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {
    const Property = sequelize.define(
        'Property',
        {
            propertyId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            propertyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING,
            }
        },
        {
            // Other model options go here
            tableName: 'properties',
        }
    );
    return Property
}
// Associations
