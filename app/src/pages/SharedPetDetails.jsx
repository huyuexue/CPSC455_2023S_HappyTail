
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {capitalizeEachWord} from "../utils";

async function fetchPet(id) {
  try {
    const res = await fetch(`http://happytails.tech:3001/pets/${id}`, {
      method: 'GET'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

const SharedPetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function getPetDetails() {
      try {
        const petData = await fetchPet(id);
        setPet(petData);
      } catch (error) {
        console.log('Pet not found');
      }
    }
    getPetDetails();
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  console.log('Pet found:', pet);


  if(!pet.petName) {
    return <div>Pet Not found...</div>;
  }
 

  return (
    <div className="shared-pet-details">
      <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}} >
        <Typography gutterBottom variant="h4" component="div">
            {capitalizeEachWord(pet.petName)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            {capitalizeEachWord(pet.species)}
        </Typography>
        <CardMedia
            component="img"
            height="250"
            image={pet.picture}
            alt={pet.petName}
        />
        <Typography variant="body2" color="text.secondary">
            {capitalizeEachWord(pet.breed)},
            {pet.age >= 12
                ? `${Math.floor(pet.age/12)} Year ${pet.age % 12} Month`
                : `${pet.age} Month`
            }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {capitalizeEachWord(pet.size)} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pet Personality: {pet.petPersonality ?
                        pet.petPersonality.map(capitalizeEachWord).join(', ') : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {pet.houseTrained ?
                        'House-trained' : ''}
        </Typography>
        
        <img src={pet.image} alt={pet.name} />
        <p>{pet.description}</p>
      </Card>
      </div>
  );
};

export default SharedPetDetails;
