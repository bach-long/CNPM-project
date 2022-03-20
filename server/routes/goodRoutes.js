const { Router } = require('express');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const {
    createGood,
    getGoods,
    getGood,
} = require('../controllers/goodController');

const router = new Router();

router.post('/', userCheck, authCheck, createGood);
router.get('/', userCheck, getGoods);
router.get('/:goodId', userCheck, getGood);

module.exports = router;
