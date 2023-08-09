import { useSelector} from "react-redux";
import React from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import {Box, useMediaQuery} from "@mui/material";
import { Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export default function PetsList() {
    const pets = useSelector(state => state.user.list);
    const favoritePetsIdList = useSelector(state => state.user.favorite);
    const allPets = useSelector(state => state.pets.list);
    const favoritePets = allPets.filter(pet => favoritePetsIdList.includes(pet._id.toString()));
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const user = useSelector(state => state.login.user);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
                {user.petOwner ?
                    <>
                        <h2>My Pet Listing</h2>
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
                    </> : <></>
                }
            </Box>
            <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
                <h2>Favorite Listing</h2>
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