const express = require('express');

const router = express.Router();

const blogPostController = require('../controller/blogPost.controller');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.get('/:id', tokenMiddleware, blogPostController.returnPost);
router.post('/', tokenMiddleware, blogPostController.returnNewBlogPost);

router.get('/:search', tokenMiddleware, blogPostController.returnSearch);

router.delete('/:id', tokenMiddleware, blogPostController.deleted);

router.put('/:id', tokenMiddleware, blogPostController.returnUpdated);

router.get('/', tokenMiddleware, blogPostController.returnPostList);

module.exports = router;