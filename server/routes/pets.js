var express = require('express');
var router = express.Router();
const Pet = require('../schema/pet'); 

async function getAllPets() {
  try {
    const pets = await Pet.find({}, 'petName age breed picture');
    return pets;
  } catch (error) {
    console.error('Error retrieving pets:', error);
    throw error;
  }
}

/* GET pets listing. */
router.get('/all', function(req, res, next) {
  getAllPets().then((p) => res.send(p));
});

// GET a single pet by ID
router.get('/:id', async (req, res, next) => {
  try {
    const petId = req.params.id; // Get the pet ID from the route parameter
    const pet = await Pet.findById(petId); // Find the pet by ID
    if (!pet) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet); // Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

// GET filtered pets
router.get('/', async (req, res, next) => {
  try {
    const {age, breed, size, gender, coatLength } = req.query;
    const query = {};
    if (age === '' && breed === '' && size === '' && gender === '' && coatLength === '') {
      return next(); // If all query parameters are empty, skip this route
    }
    if (age !== '') query.age = age;
    if (breed !== '') query.breed = breed;
    if (size !== '') query.size = size;
    if (gender !== '') query.gender = gender;
    if (coatLength !== '') query.coatLength = coatLength;
    const pets = await Pet.find(query);
    // if (!pets) {
    //   // If the pet is not found, return an appropriate response
    //   return res.status(404).json({ error: 'Pet not found' });
    // }
    res.json(pets); // Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

// GET a single pet by ID 
router.delete('/:id', async (req, res, next) => {
  try {
    const petId = req.params.id; // Get the pet ID from the route parameter
    const pet = await Pet.findByIdAndRemove(petId); // Find the pet by ID
    if (!pet) {
      // If the pet is not found, return an appropriate response
      //return res.status(404).json({ error: 'Pet not found' });
      return res.json(false);
    }
    res.json(true);// Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to delete a pet' });
  }
});


// POST request to add a new pet
router.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body); // Create a new Pet instance with the request body data
    const savedPet = await newPet.save(); // Save the new pet to the database
    res.status(201).json(savedPet); // Respond with the saved pet as JSON
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).json({ error: 'Failed to add a pet' });
  }
});

// PATCH request to update a pet by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const petId = req.params.id; // Get the pet ID from the route parameter
    const updates = req.body; // Get the updates from the request body

    const pet = await Pet.findByIdAndUpdate(petId, updates, { new: true });

    if (!pet) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(pet); // Respond with the updated pet as JSON
  } catch (error) {
    console.error('Error updating a pet:', error);
    res.status(500).json({ error: 'Failed to update a pet' });
  }
});



module.exports = router;
