const jwt = require('jsonwebtoken');
const { createBlogPost, postList } = require('../services/blogPost.service');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'mySecret';

const returnNewBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;

    const decoded = jwt.verify(authorization, secret);
    const userId = decoded.data.id;
    const { message } = await createBlogPost({ title, content, userId, categoryIds });
    res.status(201).json({ message });
};

const returnPostList = async (_req, res) => {
    const { message } = await postList();
    // const x = 1;
    res.status(200).json(message);
};

module.exports = {
    returnNewBlogPost,
    returnPostList,
};