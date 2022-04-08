const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User',
        {
            userId: {
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING, // VARCHAR(255)
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Không đúng định dạng email!',
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
            followersCount: {
                // Get this user's followers count using sequelize literal
                type: DataTypes.VIRTUAL(DataTypes.INTEGER, [
                    [
                        sequelize.literal(
                            '(SELECT COUNT(*) FROM users_followers WHERE followedId = User.userId)'
                        ),
                        'followersCount',
                    ],
                ]),
            },
            isFollowedByCurrentUser: {
                type: DataTypes.VIRTUAL,
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
    User.prototype.setIsFollowedByCurrentUser = async function (user) {
        const followingUsers = await this.getFollower();
        this.isFollowedByCurrentUser =
            followingUsers.find(
                (followingUser) => followingUser.userId === user.userId
            ) !== undefined;
    };

    // Override toJSON, hide password
    User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.password;
        return values;
    };

    /**
     *  Hooks
     */
    const hashPassword = async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    };

    User.beforeCreate(hashPassword);
    User.beforeUpdate(hashPassword);

    return User;
};
