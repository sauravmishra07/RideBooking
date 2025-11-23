const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    // Quick debug — remove after verifying payload
    console.log('Register payload:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const created = await userService.createUser(req.body);
        // adapt to your existing response shape:
        return res.status(201).json({ user: created, token: created?.token || null });
    } catch (err) {
        console.error('registerUser error:', err);
        const status = err.status || 500;
        return res.status(status).json({ message: err.message || 'Internal Server Error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token, {
        });

        res.status(200).json({ token, user });

    } catch (error) {
        next(error);  // Pass errors to global error handler
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}