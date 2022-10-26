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

const validateNewUser = async (displayName, email, password) => {
    if (displayName.length < 8) {
        return { type: 'INVALID_PROP', 
        message: '"displayName" length must be at least 8 characters long' };
    }
    if (!email.includes('@')) {
        return { type: 'INVALID_PROP', 
        message: '"email" must be a valid email' };        
    }
    if (password.length < 6) {
        return { type: 'INVALID_PROP', 
        message: '"password" length must be at least 6 characters long' };               
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
        return { type: 'USER_EXISTS', 
        message: 'User already registered' };
    }
};

module.exports = {
    validateLogin,
    validateNewUser,
};