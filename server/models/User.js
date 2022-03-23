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
                // emailCustomValidator(value) {
                //     if (!validator.isEmail(value)) {
                //         throw new Error('Không đúng định dạng email!');
                //     }
                // },
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
                        '(SELECT COUNT(*) FROM users_followers WHERE followedId = userId)'
                    ),
                    'followersCount',
                ],
            ]),
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
 *  Hooks
 */
const hashPassword = async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

/**
 *  Associations
 */
User.hasMany(Good, {
    as: 'goods',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Good.belongsTo(User, {
    as: 'User',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Comment.belongsTo(User, {
    as: 'User',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Follow
User.belongsToMany(User, {
    through: 'users_followers',
    as: 'Followed',
    foreignKey: 'followerId',
    otherKey: 'followedId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
User.belongsToMany(User, {
    through: 'users_followers',
    as: 'Follower',
    foreignKey: 'followedId',
    otherKey: 'followerId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(Good, {
    through: 'users_bookmarks',
    as: 'BookmarkedGood',
    foreignKey: 'userId',
    otherKey: 'goodId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Good.belongsToMany(User, {
    through: 'users_bookmarks',
    as: 'Bookmarker',
    foreignKey: 'goodId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = User;
