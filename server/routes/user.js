const { Router } = require('express');

const Good = require('../models/Good');
const User = require('../models/User');
const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');

const getUserGoods = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Username không tồn tại!',
                },
            });
        }

        const goods = await user.getGoods();
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
        const { username } = req.params;

        const user = await User.findOne({ where: { username } });

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

const follow = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ where: { username } });

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

const router = new Router();

router.get('/:username/goods', userCheck, getUserGoods);
router.post('/:username/follow', userCheck, authCheck, follow);
router.get('/:username/followers', getUserFollowers);

module.exports = router;
