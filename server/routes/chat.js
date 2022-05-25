const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const { Op } = require('sequelize');

const { Conversation, ChatContext } = require('../sequelize').models;

const CreateConversation = async (req, res, next) => {
    try {
        console.log(req);
        const { user1, user2 } = req.body;

        // TODO: Validate và ném lỗi đọc được

        // create good
        const conversation = await Conversation.create({
            username1: user1,
            username2: user2,
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(201).json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Create Conversation!',
            errors: error,
        });
    }
};

const ConversationList = async (req, res, next) => {
    try {
        const username = res.locals.user.username;

        // TODO: Validate và ném lỗi đọc được

        // create good
        list = await Conversation.findAll({
            where: {
                [Op.or]: [{ username1: username }, { username2: username }],
            },
        });

        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Create Good!',
            errors: error,
        });
    }
};

const CreateMessage = async (req, res, next) => {
    try {
        const { conversationId, message } = req.body;
        const username = res.locals.user.username;
        // TODO: Validate và ném lỗi đọc được

        // create good
        const context = await ChatContext.create({
            conversationId,
            username,
            context: message,
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(201).json(context);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ Create Context!',
            errors: error,
        });
    }
};

const GetContext = async (req, res, next) => {
    try {

        const { conversationId } = req.params;
        // TODO: Validate và ném lỗi đọc được

        // create good
        allContext = await ChatContext.findAll({
            where: {
                conversationId: conversationId,
            },
            order: [['createdAt', 'ASC']],
        });

        res.status(200).json(allContext);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ get Context!',
            errors: error,
        });
    }
};

const router = new Router();

router.post('/conversation', userCheck, authCheck, CreateConversation);
router.post('/message', userCheck, authCheck, CreateMessage);
router.get('/chatList', userCheck, authCheck, ConversationList);
router.get('/messages/:conversationId', userCheck, authCheck, GetContext);
router.post('/newChat', userCheck, authCheck, CreateConversation);

module.exports = router;
