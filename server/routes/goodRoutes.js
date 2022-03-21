const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const {
    createGood,
    getGoods,
    getGood,
    commentOnGood,
    getGoodComments,
} = require('../controllers/goodController');

const router = new Router();

router.post('/', userCheck, authCheck, createGood);
router.get('/', userCheck, getGoods);
router.get('/:goodId', userCheck, getGood);
router.post('/:goodId/comments', userCheck, authCheck, commentOnGood);
router.get('/:goodId/comments', userCheck, getGoodComments);

module.exports = router;
