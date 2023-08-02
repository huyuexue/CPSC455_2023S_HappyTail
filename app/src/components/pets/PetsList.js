import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import {Box, Card, useMediaQuery} from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react";
import {getPetsAsync} from "../../redux/pets/thunks";
import {getFavoriteAsync, getUserPetsAsync} from "../../redux/userPets/thunks";
import { TurnLogin, TurnLogout } from "../../redux/login/reducer";
import {getUserAsync} from "../../redux/login/thunks";
import {useTheme} from "@mui/material/styles";

export default function PetsList() {
    const token = localStorage.getItem('tokenId');
    const pets = useSelector(state => state.user.list);
    const favoritePetsIdList = useSelector(state => state.user.favorite);
    const allPets = useSelector(state => state.pets.list);
    const favoritePets = allPets.filter(pet => favoritePetsIdList.includes(pet._id.toString()));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


    useEffect(() => {
        if (token !== null){
            console.log("in pets lists");
            dispatch(getPetsAsync());
            dispatch(getUserPetsAsync({token}));
            dispatch(getFavoriteAsync({token}));
            dispatch(getUserAsync({token}));
        }
        }, [token]);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
                <h2>My Listing</h2>
                <div className="slideshow-container">
                    <Grid container spacing={1} justifyContent={isSmallScreen ? "center" : "flex-start"}>
                        {Array.isArray(pets) && pets.length > 0 ?
                            <>
                                <Grid container spacing={3} sx={{ padding: 2 }} direction={{ xs: 'column', md: 'row' }}>
                                    {pets.map(pet => (<Grid item xs={4} key={`${pet._id}-${pet.species}`}>
                                        <PetCard key={pet.id} pet={pet} ></PetCard>
                                    </Grid>))}
                                </Grid>
                            </>
                            : (
                                <p>No pets to display.</p>
                            )}
                        <Grid item xs={4}
                              display="flex" justifyContent="center" alignItems="center"
                        >
                            <AddCircleOutlineRoundedIcon fontSize="large" color="primary" onClick={()=>navigate('/addNewPet')}/>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
                <h2>My Listing</h2>
                <div className="slideshow-container">
                    <Grid container spacing={1} justifyContent={isSmallScreen ? "center" : "flex-start"}>
                        {Array.isArray(favoritePets) && favoritePets.length > 0 ?
                            <>
                                <Grid container spacing={3} sx={{ padding: 2 }} direction={{ xs: 'column', md: 'row' }}>
                                    {favoritePets.map(pet => (<Grid item xs={4} key={`${pet._id}-${pet.species}`}>
                                        <PetCard key={pet.id} pet={pet} ></PetCard>
                                    </Grid>))}
                                </Grid>
                            </>
                            : (
                                <p>No pets to display.</p>
                            )
                        }
                    </Grid>
                </div>
            </Box>
        </Box>
      );
      
}