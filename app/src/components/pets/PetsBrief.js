import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useEffect} from "react";
import {getPetsAsync} from "../../redux/pets/thunks";

export default function PetsBrief() {

    const pets = useSelector(state => state.pets.list);
    const dispatch = useDispatch();

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

    useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
        }, 6000); 
    
        return () => {
          clearInterval(interval); //if any changes in dependency, stops the callback function from executing. //clean resources before next render
        };
      }, [pets.length]); //runs on first render + whenever length changes

    useEffect(() => {
        dispatch(getPetsAsync());
    }, [pets.length]); //TODO: need to fix this dispatch

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
                      key={index}
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