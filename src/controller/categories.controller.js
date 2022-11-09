const erroMap = require('../utils/erroMap');
const { createCategory, categoryList } = require('../services/categories.service');

const returnNewCategory = async (req, res) => {
    const { name } = req.body;
    const { type, message } = await createCategory(name);
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