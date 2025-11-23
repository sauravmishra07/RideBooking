
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicleType,
  color,
  plate,
  capacity
} = {}) => {
  
  const required = {
    firstname,
    lastname,
    email,
    password,
    vehicleType,
    color,
    plate,
    capacity
  };

  const missing = Object.entries(required)
    .filter(([k, v]) => v === undefined || v === null || (typeof v === 'string' && v.trim() === ''))
    .map(([k]) => k);

  if (missing.length) {
    const err = new Error(`Missing required fields: ${missing.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }

  // ensure numeric capacity
  const capacityNumber = Number(capacity);
  if (Number.isNaN(capacityNumber) || capacityNumber < 1) {
    const err = new Error('Invalid vehicle capacity; must be a positive number');
    err.statusCode = 400;
    throw err;
  }

  // Build doc to match schema
  const toCreate = {
    fullname: {
      firstname: firstname.trim(),
      lastname: lastname.trim()
    },
    email: email.trim(),
    password, 
    vehicle: {
      color: color.trim(),
      plate: plate.trim(),
      capacity: capacityNumber,
      vehicleType
    }
  };

  // create and await the document
  const captain = await captainModel.create(toCreate);

  return captain;
};
