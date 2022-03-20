const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return next();

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
