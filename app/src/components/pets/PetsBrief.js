import {useDispatch, useSelector} from "react-redux";
import React, {useState} from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import {Box, Stack} from "@mui/material";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useEffect} from "react";
import {getPetsAsync} from "../../redux/pets/thunks";
import Carousel from "react-material-ui-carousel";
import {getFavoriteAsync, getUserPetsAsync} from "../../redux/userPets/thunks";
import {DataFetching} from "../DataFetching";

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

    const isLoading = DataFetching();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
        }, 6000);
        return () => {
            clearInterval(interval); //if any changes in dependency, stops the callback function from executing. //clean resources before next render
        };
    }, [pets.length]); //runs on first render + whenever length changes

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <h1> </h1>
                {isLoading ?
                    <p>Loading...</p> : (
                        <Carousel sx={{width: 350}}>
                            {pets.map((pet,index) => (
                                <PetCard pet={pet}  key={index} sx={{width: 350}}/>
                            ))}
                        </Carousel>
                    )
                }
            </Stack>
        </Box>
    );

}