const { BlogPost, User, Category, PostCategory } = require('../models');
const { validationBlogPost } = require('./validations/blogPost.validation');

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

module.exports = {
    createBlogPost,
    postList,
    postById,
};