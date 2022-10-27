const express = require('express');

const router = express.Router();

const blogPostController = require('../controller/blogPost.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/', tokenMiddleware, blogPostController.returnNewBlogPost);

router.get('/', tokenMiddleware, blogPostController.returnPostList);

module.exports = router;