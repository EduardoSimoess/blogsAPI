const { Category } = require('../models');

const createCategory = async (name) => {
    if (!name) return { type: 'MISSING_PROP', message: '"name" is required' };
    const { id } = await Category.create(({ name }));
    return { type: null, message: { id, name } };
};

const categoryList = async () => {
    const list = await Category.findAll();
    return { type: null, message: list };
};

module.exports = {
    createCategory,
    categoryList,
};