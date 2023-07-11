const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  size: {
    type: String,
    required: true
  },
  petPersonality: {
    type: [String],
    required: true
  },
  spayedNeutered: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
