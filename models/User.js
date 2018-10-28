// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hash: String
});

userSchema.index({ email: 1 });

// function for hash a plain password
userSchema.statics.hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, 14);
};

const User = mongoose.model('User', userSchema);

module.exports = User;