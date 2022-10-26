const { User } = require('../../models');

const validateLogin = async (email, password) => {
    if (!email || !password) {
        return { type: 'MISSING_PROP', message: 'Some required fields are missing' };
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
        return { type: 'INVALID_PROP', message: 'Invalid fields' };
    }
};

module.exports = {
    validateLogin,
};