const { login } = require('../services/login.service');
const erroMap = require('../utils/erroMap');

const returnLogin = async (req, res) => {
 const { email, password } = req.body;
const { type, message } = await login(email, password);
if (type) return res.status(erroMap(type)).json({ message });
return res.status(200).json({ token: message });
};

module.exports = {
    returnLogin,
};