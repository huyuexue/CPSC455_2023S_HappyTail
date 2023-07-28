const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: false
  },
  postCode: {
    type: Number,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  houseTrained: {
    type: Boolean,
    required: false
  },
  furType: {
    type: String,
    required: false
  },
  petFriendly: {
    type: Boolean,
    required: false
  },
  childFriendly: {
    type: Boolean,
    required: false
  },
  size: {
    type: String,
    required: false
  },
  behaviour: {
    type: String,
    required: false
  },
  spayedNeutered: {
    type: Boolean,
    required: false
  },
  coatLength: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
