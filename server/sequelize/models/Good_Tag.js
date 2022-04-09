const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Good_Tag = sequelize.define(
        'Good_Tag',
        {
            Id: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
        }, 
        {timestamps: false}
    );
    return Good_Tag
}

// Associations