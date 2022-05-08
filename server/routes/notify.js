const { Router } = require('express');
const{ Notification } = require('../sequelize').models;

const sendNotification = (req, res, next) => {
    try {
        const { content, userId } = req.body;

        // TODO: Validate và ném lỗi đọc được

        // create good
        const notification = await Notification.create({
            content,
            userId
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(201).json(notification);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Create Notification!',
            errors: error,
        });
    }
}

const getNotification = (req, res, next) => {
    try {
        const user = res.locals.user;
        let notifications = user.getNotifications();
        res.status(201).json(notifications)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ getNotification!',
            errors: error,
        });
    }
}

const router = new Router();

router.post('/sendNotification', sendNotification)
router.get('/getNotification', getNotification) 

module.exports = router;