const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');

const sequelize = require('./../database/database');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING, // VARCHAR(255)
            allowNull: false,
            unique: true,
            validate: {
                emailCustomValidator(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error('Không đúng định dạng email!');
                    }
                },
            },
        },
        username: {
            type: DataTypes.STRING(20), // VARCHAR(20)
            allowNull: false,
            primaryKey: true,
            validate: {
                len: {
                    args: [3, 20],
                    msg: 'Username phải nằm trong khoảng từ 3 đến 20 ký tự!',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 20],
                    msg: 'Mật khẩu phải nằm trong khoảng từ 6 đến 20 ký tự!',
                },
            },
        },
    },
    {
        // Other model options go here
        freezeTableName: true,
        timestamps: true, // add createdAt and updatedAt
    }
);

/*
// Adding a class level method
User.classLevelMethod = function () {
    return 'foo';
};

// Adding an instance level method
User.prototype.instanceLevelMethod = function () {
    return 'bar';
};
*/

// Hooks
User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

User.sync();

module.exports = User;
