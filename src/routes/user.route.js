const express = require('express');

const router = express.Router();

const userController = require('../controller/user.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/', userController.returnNewUser);

router.get('/:id', tokenMiddleware, userController.returnUser);

router.get('/', tokenMiddleware, userController.returnUsersList);

module.exports = router;