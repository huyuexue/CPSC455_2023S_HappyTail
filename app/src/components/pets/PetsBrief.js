import React from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import {Box, Stack} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useSelector } from 'react-redux';

export default function PetsBrief() {
    const pets = useSelector(state => state.pets.list);
    const isLoading = useSelector(state => state.pets.isLoading);

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <h1> </h1>
                {isLoading ?
                    <p>Loading...</p> :
                    (<Carousel sx={{width: 350}} navButtonsWrapperProps={{style: {zIndex: 0}}}>
                        {pets.map((pet,index) => (
                            <PetCard pet={pet}  key={index} sx={{width: 350}}/>
                        ))}
                    </Carousel>)
                }
            </Stack>
        </Box>
    );

}