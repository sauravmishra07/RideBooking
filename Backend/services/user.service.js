const userModel = require('../models/user.model');


module.exports.createUser = async (userData) => {
    // Normalize incoming payload keys (accept fullname or fullName, firstname or firstName)
    const email = userData?.email?.trim();
    const password = userData?.password;
    const fullname = userData?.fullname || userData?.fullName || {};
    const firstname = fullname?.firstname || fullname?.firstName || '';
    const lastname = fullname?.lastname || fullname?.lastName || '';

    if (!email || !password || !firstname) {
        const err = new Error('All fields are required: email, password and fullname.firstname');
        err.status = 400;
        throw err;
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}