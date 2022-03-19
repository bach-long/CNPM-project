const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('validator');

const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { email, username, password, passwordConfirm } = req.body;

        let errors = {};
        const emailUser = await User.findOne({ where: { email } });
        const usernameUser = await User.findOne({ where: { username } });

        if (emailUser) errors.email = 'Email đã tồn tại trong hệ thống!';
        if (usernameUser)
            errors.username = 'Username đã tồn tại trong hệ thống!';
        if (password.trim() !== passwordConfirm.trim())
            errors.password = 'Password không trùng khớp!';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors,
            });
        }

        // Create new user
        const user = await User.create({ email, username, password });

        res.status(200).json({
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: err,
        });
    }
};

exports.login = async (req, res, next) => {
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

exports.logout = async (req, res, next) => {
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
