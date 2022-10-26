const { validateLogin, validateNewUser } = require('./validations/user.validation');
const { createToken } = require('../utils/jwt.utils');
const { User } = require('../models');

const login = async (email, password) => {
    const e = await validateLogin(email, password);
    if (e) return e;
    const token = createToken({ email, password });
    return { type: null, message: token };
};

const createUser = async ({ id, displayName, email, password, image }) => {
    const e = await validateNewUser(displayName, email, password);
    if (e) return e;
    User.create({ id, displayName, email, password, image });
    
    const token = createToken({ displayName, email, password, image });
    return { type: null, message: token };
};

const usersList = async () => {
    const list = await User.findAll();
    if (list.length > 1) {
        const message = list.map((user) => {
           const { id, displayName, email, image } = user;
            return { id, displayName, email, image };
        });
        return { type: null, message };
    } 
        return list;
};

const userById = async (id) => {
    const user = await User.findByPk(id);
    const { displayName, email, image } = user;
    const idNumber = Number(id);
    return { ttpe: null, message: { idNumber, displayName, email, image } };
};

module.exports = {
    login,
    createUser,
    usersList,
    userById,
};