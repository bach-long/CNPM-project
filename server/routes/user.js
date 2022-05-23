const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const { route } = require('./auth');
const { User, Image, Cart, Good } = require('../sequelize').models;

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        if (res.locals.user) {
            await user.setIsFollowedByCurrentUser(res.locals.user);
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User!',
            errors: error,
        });
    }
};

const getUserGoods = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        const goods = await user.getGoods({
            order: [['updatedAt', 'DESC']],
            include: [{ model: Image, as: 'images' }],
        });

        if (res.locals.user) {
            await Promise.all(
                goods.map(async (good) => {
                    await good.setIsBookmarkedByCurrentUser(res.locals.user);
                })
            );
        }

        const sortedGoods = goods.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        res.status(200).json(sortedGoods);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Goods!',
            errors: error,
        });
    }
};

const getUserFollowers = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        const followers = await user.getFollower(); // No 's'

        res.status(200).json({
            count: followers.length,
            followers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Followers!',
            errors: error,
        });
    }
};

const getUserFollowings = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        const followings = await user.getFollowed(); // No 's'

        res.status(200).json({
            count: followings.length,
            followings,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Followings!',
            errors: error,
        });
    }
};

const follow = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        const me = res.locals.user;

        if (me.username === user.username) {
            return res.status(400).json({
                errors: {
                    username: 'Không được follow chính mình!',
                },
            });
        }

        let message = 'Follow thành công!';

        if (await user.hasFollower(me)) {
            message = 'Unfollow thành công';
            await user.removeFollower(me);
        } else {
            await user.addFollower(me);
        }

        res.status(200).json({
            message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Follow!',
            errors: error,
        });
    }
};

//them gio hang
const cartInfo = async (req,res,next) => {
    try {
        Cart.findOne({userId: res.locals.user.userId});
        goodsInCart = await Cart.findAll({include: Good});
        res.status(200).json({
            goodsInCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ CartInfo!',
            errors: error,
        });
    }
}

const router = new Router();

router.get('/:userId', userCheck, getUser);
router.get('/:userId/goods', userCheck, getUserGoods);
router.post('/:userId/follow', userCheck, authCheck, follow);
router.get('/:userId/followers', getUserFollowers);
router.get('/:userId/followings', getUserFollowings);
router.get('/Cart/Info', cartInfo);

module.exports = router;
