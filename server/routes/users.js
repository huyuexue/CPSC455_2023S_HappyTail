var express = require('express');
var router = express.Router();
const User = require('../schema/user'); 

async function getAllUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error('Error retrieving pets:', error);
    throw error;
  }
}

/* GET pets listing. */
router.get('/', function(req, res, next) {
  getAllUsers().then((p) => res.send(p));
});

// GET a single pet by ID
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id; // Get the pet ID from the route parameter
    const user = await User.findById(userId); // Find the pet by ID
    if (!user) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user); // Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

// GET a single pet by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id; // Get the pet ID from the route parameter
    const user = await Pet.findByIdAndRemove(userId); // Find the pet by ID
    if (!user) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user); // Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to delete a pet' });
  }
});


// POST request to add a new pet
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body); // Create a new Pet instance with the request body data
    const savedUser = await newUser.save(); // Save the new pet to the database
    res.status(201).json(savedPet); // Respond with the saved pet as JSON
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).json({ error: 'Failed to add a pet' });
  }
});

// PATCH request to update a pet by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id; // Get the pet ID from the route parameter
    const updates = req.body; // Get the updates from the request body

    const user = await Pet.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Respond with the updated pet as JSON
  } catch (error) {
    console.error('Error updating a user:', error);
    res.status(500).json({ error: 'Failed to update a user' });
  }
});



module.exports = router;
