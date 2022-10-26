require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mySecret';
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const createToken = (data) => {
    const token = jwt.sign({ data }, secret, jwtConfig);

    return token;
};

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, secret);

        return data;
    } catch (error) {
        const e = new Error('Token inválido');
        e.name = 'Não válido';
        throw e;
    }
};

module.exports = {
    createToken,
    validateToken,
};