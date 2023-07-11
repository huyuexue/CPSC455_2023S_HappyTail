const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  postCode: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  houseTrained: {
    type: Boolean,
    required: true
  },
  furType: {
    type: String,
    required: true
  },
  petFriendly: {
    type: Boolean,
    required: true
  },
  childFriendly: {
    type: Boolean,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  behaviour: {
    type: String,
    required: true
  },
  spayedNeutered: {
    type: String,
    required: true
  },
  coatLength: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
