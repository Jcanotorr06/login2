//Create user model for the database

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 12
  },
  password:{
    type: String,
    required: true,
    max: 1024,
    min: 8
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)
