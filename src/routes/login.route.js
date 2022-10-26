const express = require('express');

const router = express.Router();

const loginController = require('../controller/user.controller');

router.post('/', loginController.returnLogin);

module.exports = router;