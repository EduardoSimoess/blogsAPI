const jwt = require('jsonwebtoken');
const { createBlogPost, postList } = require('../services/blogPost.service');
const { User } = require('../models');
require('dotenv/config');
const erroMap = require('../utils/erroMap');

const secret = process.env.JWT_SECRET || 'mySecret';

const returnNewBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;

    const decoded = jwt.verify(authorization, secret);
    const userEmail = decoded.data.email;
    const user = await User.findOne({ where: { email: userEmail } });
    const { id } = user.dataValues;
    console.log(id);
    const { type, message } = await createBlogPost({ title, content, userId: id, categoryIds });
    if (type) return res.status(erroMap(type)).json({ message }); 
    res.status(201).json(message);
};

const returnPostList = async (_req, res) => {
    const { message } = await postList();
    res.status(200).json(message);
};

module.exports = {
    returnNewBlogPost,
    returnPostList,
};