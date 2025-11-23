const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Access denied. Unauthorized'
        });
    }
    
    const isblacklisted = await blacklistTokenModel.findOne({token: token});

    if (isblacklisted) {
        return res.status(401).json({
            message: "Unauthorized. Token has been logged out"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
       
        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
} 