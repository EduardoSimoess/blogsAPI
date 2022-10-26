const erroMap = require('../utils/erroMap');
const { Category } = require('../models');
const { createCategory } = require('../services/categories.service');

const returnNewCategory = async (req, res) => {
    const { name } = req.body;
    const categoryList = await Category.findAll();
    const last = categoryList.length - 1;
    let id = 1;
    if (categoryList[last]) {
        id = categoryList[last].id + 1;
    }
    const { type, message } = await createCategory(id, name);
    if (type) return res.status(erroMap(type)).json({ message });
    return res.status(201).json(message);
};

module.exports = {
    returnNewCategory,
};