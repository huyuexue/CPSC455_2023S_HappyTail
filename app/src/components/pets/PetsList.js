import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import {petsState} from "./petsSlice";
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import { Box, Card } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function PetsList() {
    const petsCurState = useSelector(petsState);
    const pets = petsCurState.list;
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const auth = getAuth();
    //keep track of index in the list of pets, and function to change it

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
    };
    //set function increments the index and keeps it in the loop. Moves forward

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
    };
    //does same but backwards

    React.useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
        }, 6000); 
    
        return () => {
          clearInterval(interval); //if any changes in dependency, stops the callback function from executing. //clean resources before next render
        };
      }, [pets.length]); //runs on first render + whenever length changes
      
    onAuthStateChanged(auth, (user) => {
    if (user) {
        //   const token= await user.getIdToken()
    } else {
           // alert("login please")
    }
    });


      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
            <h2>Pets Looking for A Forever Home</h2>
            <div className="slideshow-container">
              <Grid container spacing={1} alignItems="center" sx={{width:'100%', rowGap:'50px' }}>


                  {pets.map((pet, index) => (
                    <Grid item xs={4} 
                      key={pet.id}
                      display="flex" justifyContent="center" alignItems="center"
                    >
                      { <PetCard pet={pet} />}
                    </Grid>
                  ))}

                  <Grid item xs={4} 

                      display="flex" justifyContent="center" alignItems="center"
                    >
                  <Card className="pet-card" sx={{width: 345, height: 438, display:'flex', justifyContent:"center", alignItems:'center'}} onClick={()=>navigate('/addNewPet')}>
                    <AddCircleOutlineRoundedIcon fontSize="large" color="primary"/>
                  </Card>
                    
                  </Grid>

              </Grid>
            </div>
          </Box>
        </Box>
      );
      
}