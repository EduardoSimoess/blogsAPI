const jwt = require('jsonwebtoken');
const { BlogPost, User, Category, PostCategory } = require('../models');
const { validationBlogPost } = require('./validations/blogPost.validation');

const secret = process.env.JWT_SECRET || 'mySecret';

const createBlogPost = async ({ title, content, userId, categoryIds }) => {
    const validation = await validationBlogPost(title, content, categoryIds);
    if (validation) return validation;

    const obj = { title, content, userId, published: new Date(), updated: new Date() };
    const x = await BlogPost.create(obj);
    const { id } = x;
    const resolvedPrommise = categoryIds
    .map((categoty) => PostCategory.create({ postId: id, categoryId: categoty }));
    const pro = await Promise.all(resolvedPrommise);
    console.log(pro);
    return { type: null, message: x };
};

const postList = async () => {
   const list = await BlogPost.findAll(
{ attributes: { exclude: ['UserId'] },
 include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
   },
);
   return { type: null, message: list };
};

const postById = async (id) => {
    const list = await BlogPost.findByPk(id,
        { attributes: { exclude: ['UserId'] },
         include: [
                { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
                { model: Category, as: 'categories', attributes: ['id', 'name'] },
            ],
           });
        if (!list) return { type: 'MISSING_USER', message: 'Post does not exist' };
        return { type: null, message: list };
};

const updatePost = async (id, title, content, authorization) => {
    if (!title || !content) {
        return { type: 'MISSING_PROP', message: 'Some required fields are missing' }; 
}
const decoded = jwt.verify(authorization, secret);
const userEmail = decoded.data.email;
const user = await User.findOne({ where: { email: userEmail } });
const idUser = user.dataValues.id;
let { message } = await postById(id);
if (idUser !== message.userId) return { type: 'INVALID_USER', message: 'Unauthorized user' };
await BlogPost.update(
    { title, content },
    { where: { id } },
    );
    message = await (await postById(id)).message;
    return { type: null, message };
};

const deletePost = async (id, authorization) => {
const decoded = jwt.verify(authorization, secret);
const userEmail = decoded.data.email;
const user = await User.findOne({ where: { email: userEmail } });
const idUser = user.dataValues.id;
const { type, message } = await postById(id);
if (type) return { type: 'POST_DOES_NOT_EXIST', message: 'Post does not exist' };
if (idUser !== message.userId) return { type: 'INVALID_USER', message: 'Unauthorized user' };
await BlogPost.destroy({ where: { id } });
};

const searchPost = async (q) => {
    const list = (await postList()).message;
    const message = list.filter((p) => p.title.includes(q) || p.content.includes(q));
    return message;
};

module.exports = {
    createBlogPost,
    postList,
    postById,
    updatePost,
    deletePost,
    searchPost,
};