const express = require('express');

const router = express.Router();

const blogPostController = require('../controller/blogPost.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/', tokenMiddleware, blogPostController.returnNewBlogPost);

router.put('/:id', tokenMiddleware, blogPostController.returnUpdated);

router.get('/:id', tokenMiddleware, blogPostController.returnPost);

router.get('/', tokenMiddleware, blogPostController.returnPostList);

module.exports = router;