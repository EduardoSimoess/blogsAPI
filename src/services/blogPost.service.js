const { BlogPost, User, Category } = require('../models');
const { validationBlogPost } = require('./validations/blogPost.validation');

const createBlogPost = async ({ title, content, userId, categoryIds }) => {
    // console.log('hello');
    const validation = validationBlogPost(title, content, categoryIds);
    if (validation) return validation;
    
    const obj = { title, content, userId, published: new Date(), updated: new Date() };
    const x = await BlogPost.create(obj);
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
   const message = list.map((m) => m.dataValues);
   console.log(message);
   return { type: null, message: list };
};

module.exports = {
    createBlogPost,
    postList,
};