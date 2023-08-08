var express = require('express');
var router = express.Router();
const User = require('../schema/user'); 
const {getAuth} = require("firebase-admin/auth");

async function getAllUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error('Error retrieving pets:', error);
    throw error;
  }
}


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


router.post('/updateFavorites', middleware, async (req, res, next) => {
  try {
    const userId =  req.uid;
    const user = await User.findOne({uid:userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const favoriteList = user.favorite;
    const petId = req.body.petId;

    const index = favoriteList.indexOf(petId);
    if (index === -1) {
      favoriteList.push(petId);
    } else {
      favoriteList.splice(index, 1);
    }
    console.log(favoriteList);
    user.favorite = favoriteList;

    await user.save();
    return res.json({ favoriteList });
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
});
router.get('/favorites', middleware, async (req, res, next) => {
  try {
    const userId = req.uid;
    const user = await User.findOne({uid:userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const favoriteList = user.favorite;
    return res.json({ favoriteList });

  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
});

router.get('/byId', middleware, async (req, res, next) => {
  try {
    const userId = req.uid;
    const user = await User.findOne({uid:userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
});


/* GET pets listing. */
router.get('/', function(req, res, next) {
  getAllUsers().then((p) => res.send(p));
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


/* GET pets listing. */
router.get('/info', middleware , async (req, res) => {
  try {
    console.log(req.uid, req.email)
  const userinfo = await User.findOne({uid: req.uid})
  res.status(200).send({
    success:true,
    data:  userinfo
  });
}
  catch (error) {
    console.error('Error get  user:', error);
    res.status(500).json({ error: 'Failed to update a user' });
  }
});

router.post('/update/info', middleware , async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        status:false,
        message: "Content can not be empty!"
      });
      return;
    } // Create a new Pet instance with the request body data
    const data=req.body

    if (data.address==undefined || data.city==undefined || data.firstName==undefined || data.lastName==undefined||data.number==undefined||data.postCode==undefined ) {
      res.status(409).send({
        success:false,
        message: "invaild body"
      });
      return;
    }
    const userinfo = await User.findOne({uid: req.uid})

    if (userinfo == null) {
      res.status(204).send({
        success:false,
        message: "the item does not exist"
      });
      return
    }


        userinfo.address=data.address
        userinfo.city=data.city
        userinfo.firstName=data.firstName
        userinfo.lastName=data.lastName
        userinfo.number=data.number
        userinfo.postCode=data.postCode
        userinfo.petOwner=data.petOwner
    
    await userinfo.save(); // Save the new pet to the database

    res.status(200).send({
      success:true,
    }); // Respond with the saved pet as JSON
    return;
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).send({
      success:false,
      message: error
    }); // Respond with the saved pet as JSON
    return;
  }
});



router.post('/signup', middleware, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        status:false,
        message: "Content can not be empty!"
      });
      return;
    } // Create a new Pet instance with the request body data
    const data=req.body

    if (data.address==undefined || data.city==undefined || data.firstName==undefined || data.lastName==undefined||data.number==undefined||data.postCode==undefined) {
      res.status(409).send({
        success:false,
        message: "invaild body"
      });
      return;
    }
    console.log("the req email is",req.email)
    const newUser= new User({
        address:data.address,
        city:data.city,
        firstName:data.firstName,
        lastName:data.lastName,
        number:data.number,
        postCode:data.postCode,
        uid: req.uid,
        email:  req.email,
    })
    const savedUser = await newUser.save(); // Save the new pet to the database
    res.status(200).send({
      success:true,
    }); // Respond with the saved pet as JSON
    return;
  } catch (error) {
    console.error('Error adding a pet:', error);
    res.status(500).send({
      success:false,
      message: error
    }); // Respond with the saved pet as JSON
    return;
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
