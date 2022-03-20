const Good = require('../models/Good');

exports.createGood = async (req, res, next) => {
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

exports.getGoods = async (req, res, next) => {
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

exports.getGood = async (req, res, next) => {
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
