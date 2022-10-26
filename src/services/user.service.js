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

module.exports = {
    login,
    createUser,
};