const jwt = require('jsonwebtoken');

require('dotenv/config');

const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'mySecret';

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    // const { token } = req.header;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
        const decoded = jwt.verify(token, secret);
        const { email } = decoded.data;
        // console.log(decoded);
        // const user = undefined;
        const user = User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};