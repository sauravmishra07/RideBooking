const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, 'Last name must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true, // fixed typo
    select: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  socketId: {
    type: String,
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, 'Vehicle color must be at least 3 characters long'],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minLength: [4, 'Vehicle plate must be at least 4 characters long'],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Vehicle capacity must be at least 1'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'bike', 'auto'],
    },
  },
  location: {
    lat: { // fixed typo from 'ltd'
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
},
{
  timestamps: true,
});

// instance methods
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

captainSchema.methods.comparePassword = async function (candidatePassword) {
  // this.password is available only if you query with .select('+password')
  return bcrypt.compare(candidatePassword, this.password);
};

// static hashing helper
captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};
// alias to support existing controller that calls 'hashedPassword'
captainSchema.statics.hashedPassword = captainSchema.statics.hashPassword;

// optional: automatically hash password before save if modified
captainSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
