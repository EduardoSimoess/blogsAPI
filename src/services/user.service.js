const jwt = require('jsonwebtoken');
const { validateLogin, validateNewUser } = require('./validations/user.validation');
const { createToken } = require('../utils/jwt.utils');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'mySecret';

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
    if (!user || user === null) {
        return { type: 'MISSING_USER', message: 'User does not exist' };
    }
    const { displayName, email, image } = user;
    const idNumber = Number(id);
    return { ttpe: null, message: { id: idNumber, displayName, email, image } };
};

const deleteUser = async (authorization) => {
    const decoded = jwt.verify(authorization, secret);
    const userEmail = decoded.data.email;
    const user = await User.findOne({ where: { email: userEmail } });
    const { id } = user.dataValues;
    await User.destroy({ where: { id } });
};

module.exports = {
    login,
    createUser,
    usersList,
    userById,
    deleteUser,
};