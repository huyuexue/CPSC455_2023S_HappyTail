import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import {petsState} from "./petsSlice";
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import SliderButton from '../buttons/SliderButton'; 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function PetsBrief() {
    const petsCurState = useSelector(petsState);
    const pets = petsCurState.list;

    const [activeIndex, setActiveIndex] = useState(0);
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

      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <div className="main-slide">
            <h2>Pets Looking for A Forever Home</h2>
            <div className="slideshow-container">
              <Box display="flex" flexDirection="column" alignItems="center">
                <div className="buttons">
                  
                  <Button onClick={handlePrev}>
                      <ArrowBackIosIcon />
                  </Button>
                  <Button onClick={handleNext}>
                      <ArrowForwardIosIcon />
                  </Button>
                  
                </div>
                <div className="slideshow">
                  {pets.map((pet, index) => (
                    <div
                      className={`slide ${index === activeIndex ? 'active' : ''}`}
                      key={pet.id}
                    >
                      {index === activeIndex && <PetCard pet={pet} />}
                    </div>
                  ))}
                </div>
              </Box>
            </div>
          </div>
        </Box>
      );
      
}