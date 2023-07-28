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
    const {age, breed, size, gender, furType } = query;
    //const personalityArray = petPersonality ? petPersonality.split(',') : null;
    const ageValue = age !== 'any' ? age : null;
    //onst speciesValue = species ? species : null;
    const sizeValue = size !== 'any' ? size : null;
    const genderValue = gender !== 'any' ? gender : null;
    const breedValue = breed !== 'any' ? breed : null;
    const furTypeValue = furType !== 'any' ? furType : null;

    try {
      // Query the database for pets matching the provided personalities
      //const matchingPets = await Pet.find({ petPersonality: { $in: personalityArray }}).select('_id');
      /*const dynamicQuery = {
        petPersonality: { $in: personalityArray }
      };*/
      const dynamicQuery = {};
      /*if(personalityArray) {
          dynamicQuery.petPersonality = { $in: personalityArray }
      };*/

      if(ageValue) {
          if ( ageValue === 'young') {
              dynamicQuery.age = { $lte: 24 };
          } else if (ageValue === 'adult') {
              dynamicQuery.age = { $gte: 25, $lte: 84};
          } else{
              dynamicQuery.age = { $gte: 85};
          }
      }

      /*if(speciesValue) {
        dynamicQuery.species = { $eq: speciesValue};
      }*/

      if(sizeValue) {
          dynamicQuery.size = { $eq: sizeValue};
      }

      if(genderValue) {
          dynamicQuery.gender = { $eq: genderValue};
      }

      if(breedValue) {
          dynamicQuery.breed = { $regex: `.*${breedValue}.*`, $options: 'i' };
      }
        if(furTypeValue) {
            dynamicQuery.furType = { $eq: furTypeValue};
        }
      const matchingPets = await Pet.find(dynamicQuery).select('_id petName age breed picture species');
      // Extract and return the list of pet IDs
      return matchingPets;
    } catch (error) {
      console.error(error);
      throw new Error('Fetch error');
    }
  }

module.exports = { petPersonalityMatch, petMatch };
