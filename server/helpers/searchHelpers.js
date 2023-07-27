const Pet = require('../schema/pet'); 

async function petPersonalityMatch(petPersonalities) {
  const personalityArray = petPersonalities.split(',');

  try {
    // Query the database for pets matching the provided personalities
    const matchingPets = await Pet.find({ petPersonality: { $in: personalityArray } }).select('_id petName age');

    // Extract and return the list of pet IDs
    return matchingPets;
  } catch (error) {
    console.error(error);
    throw new Error('Fetch error');
  }
}

async function petMatch(query) {
    const { petPersonality, age, species, size, gender, breed, ...otherFields } = query;
    const personalityArray = petPersonality ? petPersonality.split(',') : null;
    const ageValue = age ? parseInt(age) : null;
    const speciesValue = species ? species : null;
    const sizeValue = size ? size : null;
    const genderValue = gender ? gender : null;
    const breedValue = breed ? breed : null;
  
    try {
      // Query the database for pets matching the provided personalities
      //const matchingPets = await Pet.find({ petPersonality: { $in: personalityArray }}).select('_id');
      /*const dynamicQuery = {
        petPersonality: { $in: personalityArray }
      };*/
      const dynamicQuery = {};
      if(personalityArray) {
          dynamicQuery.petPersonality = { $in: personalityArray }
      };

      if(ageValue) {
        dynamicQuery.age = { $eq: parseInt(ageValue) };
      }

      if(speciesValue) {
        dynamicQuery.species = { $eq: speciesValue};
      }

      if(sizeValue) {
        dynamicQuery.size = { $eq: sizeValue};
      }

      if(genderValue) {
        dynamicQuery.gender = { $eq: genderValue};
      }

      if(breedValue) {
        dynamicQuery.breed = { $eq: breedValue};
      }
      

      const matchingPets = await Pet.find(dynamicQuery).select('_id petName age breed picture');
      
    
      // Extract and return the list of pet IDs
      return matchingPets;
    } catch (error) {
      console.error(error);
      throw new Error('Fetch error');
    }
  }

module.exports = { petPersonalityMatch, petMatch };
