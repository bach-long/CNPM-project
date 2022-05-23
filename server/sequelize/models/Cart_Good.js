const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Cart_Good = sequelize.define(
        'Cart_Good',
        {
            Id: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            }
        },
        {
            tableName: 'cart_good',
            timestamps: true,
        }
    );

    return Cart_Good;
};