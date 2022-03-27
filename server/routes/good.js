const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');

const Comment = require('../models/Comment');
const Good = require('../models/Good');
const Image = require('../models/Image');

const createGood = async (req, res, next) => {
    try {
        const { name, description, address, price, state } = req.body;
        const user = res.locals.user;

        // TODO: Validate và ném lỗi đọc được

        // create good
        const good = await Good.create({
            name,
            description,
            address,
            price,
            state,
            userId: user.userId,
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(200).json(good);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Create Good!',
            errors: error,
        });
    }
};

const getGoods = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        // TODO: Change this
        const countPerPage = req.query.count || 100;

        const goods = await Good.findAll({
            order: [['createdAt', 'DESC']],
            offset: (currentPage - 1) * countPerPage,
            limit: countPerPage,
        });

        // TODO: Set user specific things like bookmarked using res.locals.user

        res.status(200).json(goods);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get Goods!',
            errors: error,
        });
    }
};

const getGood = async (req, res, next) => {
    try {
        const { goodId } = req.params;

        const good = await Good.findOne({
            where: {
                goodId,
            },
        });

        if (!good) {
            return res.status(404).json({
                error: 'Không tìm thấy Good',
            });
        }

        // TODO: Set user specific things like bookmarked using res.locals.user

        res.status(200).json(good);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get Good!',
            errors: error,
        });
    }
};

const deleteGood = async (req, res, next) => {
    try {
        const { goodId } = req.params;
        const user = res.locals.user;

        const good = await Good.findOne({
            where: {
                goodId,
            },
        });

        if (!good) {
            return res.status(404).json({
                error: 'Không tìm thấy Good',
            });
        }

        if (good.userId !== user.userId) {
            return res.status(403).json({
                error: 'Bạn không có quyền xóa Good này',
            });
        }

        // TODO: Only mark good as deleted but not delete it from database
        await good.destroy();

        res.status(204).json({
            message: 'Xóa thành công',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Delete Good!',
            errors: error,
        });
    }
};

const commentOnGood = async (req, res, next) => {
    try {
        const { goodId } = req.params;
        const { content } = req.body;

        const good = await Good.findOne({ where: { goodId } });

        const comment = await Comment.create({
            content,
            userId: res.locals.user.userId,
            goodId: good.goodId,
        });

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get Good Comments!',
            errors: error,
        });
    }
};

const getGoodComments = async (req, res, next) => {
    try {
        const { goodId } = req.params;
        const good = await Good.findOne({ where: { goodId } });

        let comments = await good.getComments();
        comments = comments.reverse(); // createdAt DESC

        // TODO: Set user specific things like liked comment using res.locals.user

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Get Good Comments!',
            errors: error,
        });
    }
};

const router = new Router();

router.post('/', userCheck, authCheck, createGood);
router.get('/', userCheck, getGoods);
router.get('/:goodId', userCheck, getGood);
router.delete('/:goodId', userCheck, authCheck, deleteGood);
router.post('/:goodId/comments', userCheck, authCheck, commentOnGood);
router.get('/:goodId/comments', userCheck, getGoodComments);

module.exports = router;