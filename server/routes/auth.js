const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('validator');

const authCheck = require('../middlewares/authCheck.js');
const userCheck = require('../middlewares/userCheck.js');

const { User, Cart } = require('../sequelize').models;

const register = async (req, res, next) => {
    try {
        const { email, username, password, passwordConfirm, address, sdt } =
            req.body;

        let errors = {};
        const emailUser = await User.findOne({ where: { email } });
        const usernameUser = await User.findOne({ where: { username } });
        const sdtUser = await User.findOne({ where: { sdt } });

        if (emailUser) errors.email = 'Email đã tồn tại trong hệ thống!';
        if (usernameUser)
            errors.username = 'Username đã tồn tại trong hệ thống!';
        if (sdtUser) errors.sdt = 'Số điện thoại đã tồn tại trong hệ thống!!';
        if (password.trim() !== passwordConfirm.trim())
            errors.password = 'Password không trùng khớp!';
        if (!sdt || sdt.trim() === '')
            errors.sdt = 'Số điện thoại không được bỏ trống!';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors,
            });
        }

        // Create new user
        const user = await User.create({
            email,
            username,
            password,
            address,
            sdt,
        });

        await Cart.create({
            userId: user.userId
        })

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: err,
        });
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        let errors = {};
        if (isEmpty(username))
            errors.username = 'Username không được để trống!';
        if (isEmpty(password))
            errors.password = 'Password không được để trống!';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors,
            });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                errors: {
                    username: 'Không tìm thấy user!',
                },
            });
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            return res.status(401).json({
                errors: {
                    password: 'Mật khẩu không đúng!',
                },
            });
        }

        // Generate Token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);

        res.status(200).cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            // maxAge: 360000, // 100 hours
            sameSite: 'none',
        });

        res.status(200).json({
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: error,
        });
    }
};

const me = async (req, res, next) => {
    try {
        res.status(200).json(res.locals.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: error,
        });
    }
};

const updateMe = async (req, res, next) => {
    try {
        const { user } = res.locals;

        const { address, sdt } = req.body;

        await User.update(
            { address, sdt },
            { where: { username: user.username } }
        );

        const updatedUser = await User.findOne({
            where: { username: user.username },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: error,
        });
    }
};

const logout = async (req, res, next) => {
    try {
        // Reset cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'none',
            expires: new Date(Date.now() + 1 * 1000),
        });
        res.status(200).json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: error,
        });
    }
};

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', userCheck, authCheck, me);
router.patch('/me', userCheck, authCheck, updateMe);
router.get('/logout', userCheck, authCheck, logout);

module.exports = router;
