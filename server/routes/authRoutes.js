const { Router } = require('express');
const { register, login, logout } = require('../controllers/authController.js');
const authCheck = require('../middlewares/authCheck.js');
const userCheck = require('../middlewares/userCheck.js');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', userCheck, authCheck, logout);

module.exports = router;
