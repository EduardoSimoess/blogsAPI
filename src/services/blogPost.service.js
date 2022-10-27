const { BlogPost } = require('../models');
const { validationBlogPost } = require('./validations/blogPost.validation');

const createBlogPost = async ({ title, content, userId, categoryIds }) => {
    const validation = validationBlogPost(title, content, categoryIds);

    if (validation) return validation;
    const obj = { title, content, userId, published: new Date(), updated: new Date() };
    const x = BlogPost.create(obj);
    console.log(x);
    return { type: null, message: x };
};

const postList = async () => {
   const list = await BlogPost.findAll();
   const message = list.map((m) => m.dataValues);
   console.log(message);
   return { type: null, message };
};

module.exports = {
    createBlogPost,
    postList,
};