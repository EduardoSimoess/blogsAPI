const { Category } = require('../../models');

const validationBlogPost = async (title, content, categoryIds) => {
    if (!title || !content || !categoryIds) {
        return { type: 'MISSING_PROP', message: 'Some required fields are missing' }; 
}

const categories = await Category.findAll();

const idList = categories.map((categorie) => categorie.id);

const boll = categoryIds.every((id) => idList.includes(id));
if (!boll) {
return { type: 'MISSING_PROP', message: 'one or more "categoryIds" not found' }; 
} 
};

module.exports = { validationBlogPost };