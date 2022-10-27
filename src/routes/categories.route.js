const express = require('express');

const router = express.Router();

const categoryController = require('../controller/categories.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/', tokenMiddleware, categoryController.returnNewCategory);

router.get('/', tokenMiddleware, categoryController.returnCategoryList);

module.exports = router;