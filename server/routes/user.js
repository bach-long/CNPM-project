const { Router } = require('express');

const Good = require('../models/Good');
const User = require('../models/User');
const userCheck = require('../middlewares/userCheck');

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

        res.status(200).json({
            user,
            goods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Goods!',
            errors: error,
        });
    }
};

const getUserFollows = async (req, res, next) => {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Goods!',
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get User Goods!',
            errors: error,
        });
    }
};

const router = new Router();

router.get('/:username/goods', userCheck, getUserGoods);
router.get('/:username/follows', getUserFollows);
router.post('/:username/follow', follow);

module.exports = router;
