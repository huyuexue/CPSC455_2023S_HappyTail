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
    type: String,
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
  favorite: {
    type: Array,
    required: false
  },
  petOwner: {
    type: Boolean,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
