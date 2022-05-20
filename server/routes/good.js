const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const { Op } = require('sequelize');

const { Good, Comment, Image } = require('../sequelize').models;

const createGood = async (req, res, next) => {
    try {
        const {
            name,
            description,
            address,
            price,
            state,
            brand,
            type,
            maintenance,
            details,
            color,
            tagId,
        } = req.body;
        const user = res.locals.user;

        // TODO: Validate và ném lỗi đọc được

        // create good
        const good = await Good.create({
            name,
            description,
            address,
            price,
            state,
            brand,
            type,
            maintenance,
            details,
            color,
            userId: user.userId,
            tagId,
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(201).json(good);
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
        let currentPage = +req.query.page || 1;
        currentPage = currentPage > 0 ? currentPage : 1;
        let countPerPage = +req.query.count || 20;
        countPerPage = countPerPage > 0 ? countPerPage : 20;

        const query = req.query.query || '';

        const goods = await Good.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`,
                },
            },
            order: [['createdAt', 'DESC']],
            offset: (currentPage - 1) * countPerPage,
            limit: countPerPage,
            include: [{ model: Image, as: 'images' }],
        });
        const goodsCount = goods.length;
        const totalPageCount = Math.ceil(goodsCount / countPerPage);

        // Set user specific things like bookmarked using res.locals.user
        if (res.locals.user) {
            await Promise.all(
                goods.map(async (good) => {
                    await good.setIsBookmarkedByCurrentUser(res.locals.user);
                })
            );
        }

        res.status(200).json({
            page: currentPage,
            limit: countPerPage,
            totalPageCount,
            goods,
        });
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
            include: [{ model: Image, as: 'images' }],
        });

        if (!good) {
            return res.status(404).json({
                error: 'Không tìm thấy Good',
            });
        }

        // Set user specific things like bookmarked using res.locals.user
        if (res.locals.user) {
            await good.setIsBookmarkedByCurrentUser(res.locals.user);
        }
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
        const goodId = +req.params.goodId;
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

        res.status(201).json(comment);
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

const bookmarkGood = async (req, res, next) => {
    try {
        const { user } = res.locals;
        const { goodId } = req.params;

        const good = await Good.findOne({ where: { goodId } });

        let message = 'Bookmark thành công!';

        if (await user.hasBookmarkedGood(good)) {
            message = 'Hủy Bookmark thành công';
            await user.removeBookmarkedGood(good);
        } else {
            await user.addBookmarkedGood(good);
        }

        res.status(200).json({
            message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Bookmark Good!',
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
router.post('/:goodId/bookmark', userCheck, authCheck, bookmarkGood);

module.exports = router;
