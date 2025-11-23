const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehicleType, color, plate, capacity
}) => {
    if(!firstname || !email || password || !vehicleType || !color || !plate || !capacity){
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType: vehicle
        }
    })
    return captain;
}