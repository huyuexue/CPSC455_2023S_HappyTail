var express = require('express');
var router = express.Router();
const Pet = require('../schema/pet'); 
const { petMatch } = require('../helpers/searchHelpers');
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
  try {
    const matchingPets = await petMatch(req.query);
    res.json({ matchingPets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'fetch error' });
  }
});

async function middleware(req, res, next)  {
  if (!req.headers.authorization) {
    return res.status(403).json([]);
  }

  const idToken=req.headers.authorization;
  getAuth().verifyIdToken(idToken)
  .then((decodedToken) => {
    req.uid = decodedToken.uid;
    req.email = decodedToken.email;
    next()
  })
  .catch((error) => {
    console.log(error)
    return res.status(403).json([]);
  });
}

async function AuthCheck(req, res, next)  {
  if (req.uid==undefined) {
    return res.status(403).json({ error: 'invaid token' });
  }
  const petId = req.params.id;
  const pet = await Pet.findById(petId);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  if (pet.uid==req.uid){
    next()
  }else{
    return res.status(403).json({ error: 'incorrect auth' });
  }

}

router.get('/all', function(req, res, next) {
  getAllPets().then((p) => res.send(p));
});

router.get('/byuser',middleware, async (req, res, next) => {
  try {
    const pet = await Pet.find({uid:req.uid}); // Find the pet by ID
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

router.get('/filter', async (req, res, next) => {
  try {
    const {age, breed, size, gender, coatLength } = req.query;
    const query = {};
    if (age !== '') query.age = age;
    if (breed !== '') query.breed = breed;
    if (size !== '') query.size = size;
    if (gender !== '') query.gender = gender;
    if (coatLength !== '') query.coatLength = coatLength;
    const pets = await Pet.find(query);
    if (!pets) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pets);
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to retrieve a pet' });
  }
});

router.delete('/:id', middleware, AuthCheck, async (req, res, next) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findByIdAndRemove(petId);
    if (!pet) {
      return res.json(false);
    }
    res.json(petId);
  } catch (error) {
    console.error('Error retrieving a pet:', error);
    res.status(500).json({ error: 'Failed to delete a pet' });
  }
});


router.post('/', middleware, async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    newPet.uid= req.uid;
    newPet.uid= req.uid;
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).json({ error: 'Failed to add a pet' });
  }
});

router.patch('/:id', middleware, AuthCheck, async (req, res, next) => {
  try {

    const petId = req.params.id;
    const updates = req.body.pet;
    updates.uid=req.uid;
    const pet = await Pet.findByIdAndUpdate(petId, updates, { new: true });
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error updating a pet:', error);
    res.status(500).json({ error: 'Failed to update a pet' });
  }
});

module.exports = router;
