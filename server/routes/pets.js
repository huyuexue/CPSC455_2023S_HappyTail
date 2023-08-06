var express = require('express');
var router = express.Router();
const Pet = require('../schema/pet'); 
const { petPersonalityMatch, petMatch } = require('../helpers/searchHelpers');
const {getAuth} = require("firebase-admin/auth");


async function getAllPets() {
  try {
    const pets = await Pet.find({}, 'petName age breed picture species');
    return pets;
  } catch (error) {
    console.error('Error retrieving pets:', error);
    throw error;
  }
}

router.get('/search', async(req, res) => {
  //const personalityArray = petPersonalities.split(',');
  try {
    //const matchingPets = await Pet.find({ petPersonality: { $in: personalityArray } }).select('_id');
    console.log("in BE");
    const matchingPets = await petMatch(req.query);

    res.json({ matchingPets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'fetch error' });
  }
});

async function middleware(req, res, next)  {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'invaid token' });
  }

  const idToken=req.headers.authorization;
  getAuth().verifyIdToken(idToken)
  .then((decodedToken) => {
    req.uid = decodedToken.uid;
    req.email = decodedToken.email;
    console.log("email is", decodedToken.email, "uid is ", decodedToken.uid)
    next()
  })
  .catch((error) => {
    console.log(error)
    return res.status(403).json({ error: 'invaid token' });
  });
}

async function AuthCheck(req, res, next)  {
  if (req.uid==undefined) {
    return res.status(403).json({ error: 'invaid token' });
  }
  const petId = req.params.id; // Get the pet ID from the route parameter
  const pet = await Pet.findById(petId);
  if (!pet) {
    // If the pet is not found, return an appropriate response
    return res.status(404).json({ error: 'Pet not found' });
  }
  if (pet.uid==req.uid){
    next()
  }else{
    return res.status(403).json({ error: 'incorrect auth' });
  }

}

/* GET pets listing. */
router.get('/all', function(req, res, next) {
  getAllPets().then((p) => res.send(p));
});

router.get('/byuser',middleware, async (req, res, next) => {
  try {
    //console.log(req.uid);
    const pet = await Pet.find({uid:req.uid}); // Find the pet by ID
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
router.get('/filter', async (req, res, next) => {
  try {
    const {age, breed, size, gender, coatLength } = req.query;
    console.log("pass query");
    const query = {};
    if (age !== '') query.age = age;
    if (breed !== '') query.breed = breed;
    if (size !== '') query.size = size;
    if (gender !== '') query.gender = gender;
    if (coatLength !== '') query.coatLength = coatLength;
    const pets = await Pet.find(query);
    if (!pets) {
      // If the pet is not found, return an appropriate response
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pets); // Respond with the found pet as JSON
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

// DELETE a single pet by ID
router.delete('/:id', middleware, AuthCheck, async (req, res, next) => {
  try {
    const petId = req.params.id; // Get the pet ID from the route parameter
    const pet = await Pet.findByIdAndRemove(petId); // Find the pet by ID
    if (!pet) {
      // If the pet is not found, return an appropriate response
      //return res.status(404).json({ error: 'Pet not found' });
      return res.json(false);
    }
    res.json(petId);// Respond with deleted pet
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to delete a pet' });
  }
});


// POST request to add a new pet

router.post('/', middleware, async (req, res) => {
  try {
    const newPet = new Pet(req.body); // Create a new Pet instance with the request body data
    newPet.uid= req.uid;
    newPet.uid= req.uid;
    const savedPet = await newPet.save(); // Save the new pet to the database
    res.status(201).json(savedPet); // Respond with the saved pet as JSON
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).json({ error: 'Failed to add a pet' });
  }
});

// PATCH request to update a pet by ID
router.patch('/:id', middleware, AuthCheck, async (req, res, next) => {
  try {

    const petId = req.params.id; // Get the pet ID from the route parameter
    const updates = req.body.pet; // Get the updates from the request body
    updates.uid=req.uid;
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
