import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import { Box, Card } from "@mui/material";
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

export default function PetsList() {
  const[token, setToken]=useState("");
  const pets = useSelector(state => state.user.list);
  const favoritePetsIdList = useSelector(state => state.user.favorite);
  const allPets = useSelector(state => state.pets.list);
  const favoritePets = allPets.filter(pet => favoritePetsIdList.includes(pet._id.toString()));
  const dispatch = useDispatch();
 
  const auth = getAuth();
  const navigate = useNavigate();
    //keep track of index in the list of pets, and function to change it

    //does same but backwards

  useEffect(() => {
    if (token !=""){
      dispatch(getPetsAsync());
      dispatch(getUserPetsAsync({token}));
      dispatch(getFavoriteAsync({token}));
    }
  }, [token]);


  const getToken=async (user)=>{
    const token= await user.getIdToken()
    setToken(token)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getToken(user)

      } else {
            navigate("/")
      }
      });
  }, []);   

      return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
            <h2>My Listing</h2>
            <div className="slideshow-container">
              <Grid container spacing={1} alignItems="center" sx={{width:'100%', rowGap:'50px' }}>
                  {Array.isArray(pets) && pets.length > 0 ?  (
                      pets.map((pet, index) => (
                        <Grid item xs={4}
                          key={index}
                          display="flex" justifyContent="center" alignItems="center"
                        >
                          { <PetCard pet={pet} token={token} />}
                        </Grid>
                      ))
                  ): (
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
            <h2>My Favorite</h2>
            <div className="slideshow-container">
              <Grid container spacing={1} alignItems="center" sx={{width:'100%', rowGap:'50px' }}>
                {Array.isArray(favoritePets) && favoritePets.length > 0 ?  (
                    favoritePets.map((pet, index) => (
                        <Grid item xs={4}
                              key={index}
                              display="flex" justifyContent="center" alignItems="center"
                        >
                          { <PetCard pet={pet} token={token} />}
                        </Grid>
                    ))
                ): (
                    <p>No pets to display.</p>
                )}

              </Grid>
            </div>
          </Box>
        </Box>
      );
      
}