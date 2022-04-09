const { triggerAsyncId } = require("async_hooks");


const applyExtraSetup = (sequelize) => {
    const { User, Good, Comment, Image, Group, Tag, Property } = sequelize.models;

    // User Goods
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

    // User Comments
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

    // Bookmark
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

    // Avatar
    User.hasOne(Image, {
        as: 'avatar',
        foreignKey: { name: 'userImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Image.belongsTo(User, {
        as: 'user',
        foreignKey: { name: 'userImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Comment on Good
    Good.hasMany(Comment, {
        as: 'comments',
        foreignKey: 'goodId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Comment.belongsTo(Good, {
        as: 'Good',
        foreignKey: 'goodId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Image on Good
    Good.hasMany(Image, {
        as: 'images',
        foreignKey: { name: 'goodImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Image.belongsTo(Good, {
        as: 'Good',
        foreignKey: { name: 'goodImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Image on Comment
    Comment.hasMany(Image, {
        as: 'images',
        foreignKey: { name: 'cmtImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Image.belongsTo(Comment, {
        as: 'Comment',
        foreignKey: { name: 'cmtImgId', defaultValue: null },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Group.hasMany(Tag, {
        as: 'tags',
        foreignKey: {name: 'groupId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Tag.belongsTo(Group, {
        as: 'Group',
        foreignKey: {name: 'groupId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Tag.hasMany(Good, {
        as: 'goods',
        foreignKey: {name: 'tagId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    Good.belongsTo(Tag, {
        as: 'Tag',
        foreignKey: {name: 'tagId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Good.hasMany(Property, {
        as: 'properties',
        foreignKey: {name: 'goodId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Property.belongsTo(Good, {
        as: 'Good',
        foreignKey: {name: 'goodId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
};

module.exports = { applyExtraSetup };
