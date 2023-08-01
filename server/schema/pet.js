const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  uid:{
    type: String,
    required: false
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  houseTrained: {
    type: Boolean,
    required: true
  },
  furType: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  petPersonality: {
    type: [String],
    required: false
  },
  spayed: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  addInfo: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: false
  },
  length: {
    type: String,
    required: false
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
