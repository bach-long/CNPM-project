const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BuyGoods = sequelize.define(
        'BuyGoods',
        {
            Id: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(50),
            },
            goodId: {
                type: DataTypes.INTEGER(11),
            },
            amount: {
                type: DataTypes.INTEGER(11),
            }
        },
        {
            tableName: 'buygoods',
            timestamps: true,
        }
    );

    return BuyGoods;
};