const { Category } = require('../models');

const createCategory = async (id, name) => {
    if (!name) return { type: 'MISSING_PROP', message: '"name" is required' };
    Category.create(({ id, name }));
    return { type: null, message: { id, name } };
};

module.exports = {
    createCategory,
};