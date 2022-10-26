const { validateLogin } = require('./validations/login.validation');
const { createToken } = require('../utils/jwt.utils');

const login = async (email, password) => {
    const e = await validateLogin(email, password);
    if (e) return e;
    const token = createToken({ email, password });
    return { type: null, message: token };
};

module.exports = {
    login,
};