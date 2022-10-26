const { login, createUser } = require('../services/user.service');
const erroMap = require('../utils/erroMap');
const { User } = require('../models');

const returnLogin = async (req, res) => {
 const { email, password } = req.body;
const { type, message } = await login(email, password);
if (type) return res.status(erroMap(type)).json({ message });
return res.status(200).json({ token: message });
};

const returnNewUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const userList = await User.findAll();
    const last = userList.length - 1;
    let id = 1;
    // console.log(userList[last]);
    if (userList[last]) {
         id = userList[last].id + 1;
    }
    const { type, message } = await createUser({ id, displayName, email, password, image });
    if (type) return res.status(erroMap(type)).json({ message });
    return res.status(201).json({ token: message });
};

module.exports = {
    returnLogin,
    returnNewUser,
};