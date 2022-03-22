const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');

const sequelize = require('./../database/database');
const Good = require('./Good');
const Comment = require('./Comment');

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true,
        },
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
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sdt: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                sdtCustomValidator(value) {
                    if (!validator.isMobilePhone(value, 'vi-VN')) {
                        throw new Error(
                            'Không đúng định dạng số điện thoại VN!'
                        );
                    }
                },
            },
        },
    },
    {
        // Other model options go here
        tableName: 'users',
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

// Override toJSON, hide password
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
};

/**
 *  Associations
 */
User.hasMany(Good, { as: 'goods', foreignKey: 'userId' });
Good.belongsTo(User, { as: 'User', foreignKey: 'userId' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'User', foreignKey: 'userId' });

// Follow
User.belongsToMany(User, {
    through: 'follow',
    as: 'follower',
    foreignKey: 'followedId',
    otherKey: 'followerId',
});
User.belongsToMany(User, {
    through: 'follow',
    as: 'followed',
    foreignKey: 'followerId',
    otherKey: 'followedId',
});

/**
 *  Hooks
 */
User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

module.exports = User;
