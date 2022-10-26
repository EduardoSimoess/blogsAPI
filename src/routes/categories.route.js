const express = require('express');

const router = express.Router();

const categoryController = require('../controller/categories.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/', tokenMiddleware, categoryController.returnNewCategory);

module.exports = router;