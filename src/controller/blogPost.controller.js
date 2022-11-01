const jwt = require('jsonwebtoken');
const { createBlogPost,
    postList, postById, updatePost, deletePost } = require('../services/blogPost.service');
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

const returnPost = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postById(id);
    if (type) return res.status(erroMap(type)).json({ message });
    res.status(200).json(message);
};

const returnUpdated = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title, content } = req.body;
    const { type, message } = await updatePost(id, title, content, authorization);
    if (type) return res.status(erroMap(type)).json({ message });
    res.status(200).json(message);
};

const deleted = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const result = await deletePost(id, authorization);
    if (result) {
        const { type, message } = result;
        return res.status(erroMap(type)).json({ message });
    }
    res.status(204).json(null);
};

module.exports = {
    returnNewBlogPost,
    returnPostList,
    returnPost,
    returnUpdated,
    deleted,
};