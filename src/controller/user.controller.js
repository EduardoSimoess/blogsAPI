const { login, createUser, usersList, userById, deleteUser } = require('../services/user.service');
const erroMap = require('../utils/erroMap');

const returnLogin = async (req, res) => {
 const { email, password } = req.body;
const { type, message } = await login(email, password);
if (type) return res.status(erroMap(type)).json({ message });
return res.status(200).json({ token: message });
};

const returnNewUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const { type, message } = await createUser({ displayName, email, password, image });
    if (type) return res.status(erroMap(type)).json({ message });
    return res.status(201).json({ token: message });
};

const returnUsersList = async (_req, res) => {
    const { message } = await usersList();
    res.status(200).json(message);
};

const returnUser = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userById(id);
    if (type) return res.status(erroMap(type)).json({ message });
    return res.status(200).json(message);
};

const returnDelete = async (req, res) => {
    const { authorization } = req.headers;
    await deleteUser(authorization);
    res.status(204).json(null);
};

module.exports = {
    returnLogin,
    returnNewUser,
    returnUsersList,
    returnUser,
    returnDelete,
};