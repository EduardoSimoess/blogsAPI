const erroMap = require('../utils/erroMap');
const { Category } = require('../models');
const { createCategory, categoryList } = require('../services/categories.service');

const returnNewCategory = async (req, res) => {
    const { name } = req.body;
    const categories = await Category.findAll();
    const last = categories.length - 1;
    let id = 1;
    if (categories[last]) {
        id = categories[last].id + 1;
    }
    const { type, message } = await createCategory(id, name);
    if (type) return res.status(erroMap(type)).json({ message });
    return res.status(201).json(message);
};

const returnCategoryList = async (req, res) => {
    const { message } = await categoryList();
    res.status(200).json(message);
};

module.exports = {
    returnNewCategory,
    returnCategoryList,
};