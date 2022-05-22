const jwt = require('jsonwebtoken');

const { User } = require('../sequelize').models;

module.exports = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;

        // Đây chắc chắn không phải là một lỗ hổng bảo mật :)
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next();
        }

        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ where: { username } });

        res.locals.user = user;

        return next();
    } catch (err) {
        console.log(err);
        return res
            .status(401)
            .json({ error: 'Unauthenticated from userCheck!' });
    }
};
