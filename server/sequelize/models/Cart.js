const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define(
        'Cart',
        {
            cartId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            }
        },
        {
            tableName: 'carts',
            timestamps: true,
        }
    );

    return Cart;
};
