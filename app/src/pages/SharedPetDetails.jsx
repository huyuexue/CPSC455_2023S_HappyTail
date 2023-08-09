import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Fab,
    Grid, SpeedDial, SpeedDialAction,
    Stack,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {capitalizeEachWord} from "../utils";
import {clearSelectInUserPets, getSelectedItem, openUpdateView} from "../redux/userPets/reducer";
import {closeDetailView, closeDetailViewFull} from "../redux/detail/reducer";
import {deletePetAsync, getUserPetsAsync} from "../redux/userPets/thunks";
import {FavoriteBorder, Share, Sort} from "@mui/icons-material";

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
    const {id} = useParams();
    const [petInfo, setPetInfo] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const petActions = [
        {label: "Share", value: "Share", icon: <Share/>},
        {label: "Shortlist", value: "Shortlist", icon: <FavoriteBorder/>},
    ]

    useEffect(() => {
        async function getPetDetails() {
            try {
                const petData = await fetchPet(id);
                setPetInfo(petData);
            } catch (error) {
                console.log('Pet not found');
            }
        }

        getPetDetails();
    }, [id]);

    if (!petInfo) {
        return <div>Loading...</div>;
    }

    console.log('Pet found:', petInfo);


    if (!petInfo.petName) {
        return <div>Pet Not found...</div>;
    }


    return (
        <>
            <SpeedDial
                ariaLabel="Sorting Options"
                sx={{position: 'fixed', bottom: 45, right: 70}}
                icon={
                    <Fab variant="extended" color="primary" aria-label="add"
                         sx={{minWidth: '130px', minHeight: '65px'}}>
                        <Sort sx={{mr: 1}}/>
                        Sort by
                    </Fab>
                }
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {petActions.map((action) => (
                    <SpeedDialAction
                        key={action.value}
                        icon={action.icon}
                        tooltipTitle={action.label}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
            <Grid container spacing={0} paddingTop={5} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={8}>
                    <h1>{petInfo.petName}</h1>

                    <CardMedia
                        component="img"
                        height="400"
                        image={petInfo.picture}
                        alt="Not Available"
                        sx={{borderRadius: 3}}
                    />
                    <CardContent>
                        <Stack sx={{}}>
                            <p>Breed: {capitalizeEachWord(petInfo.breed)}</p>
                            <p>Gender: {capitalizeEachWord(petInfo.gender)}</p>
                            <p>Age: {petInfo.age >= 12
                                ? `${Math.floor(petInfo.age / 12)} Year ${petInfo.age % 12} Month`
                                : `${petInfo.age} Month`
                            }</p>
                            <p>Size: {capitalizeEachWord(petInfo.size)}</p>
                            <p>Spayed: {capitalizeEachWord(petInfo.spayed)}</p>
                            <p>House Trained: {petInfo.houseTrained ? "Yes" : "No"}</p>
                            <div className="horizontalLine"></div>
                            <p>Location: {petInfo.postCode}</p>
                            <p>Fur Type: {capitalizeEachWord(petInfo.furType)}</p>
                            <p>Pet Personality: {petInfo.petPersonality ?
                                petInfo.petPersonality.map(capitalizeEachWord).join(', ') : ''}</p>
                            <p>Description:{petInfo.description}</p>
                            <div className="horizontalLine"></div>
                            <p>Name: {capitalizeEachWord(petInfo.contactName)}</p>
                            <p>Email: {capitalizeEachWord(petInfo.contactEmail)}</p>
                            <p>Phone Number: {capitalizeEachWord(petInfo.contactNumber)}</p>

                            {/*<div className='btn-container'>*/}
                            {/*    {dashboard ? (*/}
                            {/*        <>*/}
                            {/*            <button*/}
                            {/*                className="updateItemButton"*/}
                            {/*                onClick={() => {*/}
                            {/*                    dispatch(getSelectedItem(petInfo));*/}
                            {/*                    dispatch(closeDetailView());*/}
                            {/*                    dispatch(openUpdateView());*/}
                            {/*                }}>*/}
                            {/*                Edit*/}
                            {/*            </button>*/}
                            {/*            <button*/}
                            {/*                className="deleteItemButton"*/}
                            {/*                onClick={() => {*/}
                            {/*                    dispatch(deletePetAsync({id, token}));*/}
                            {/*                    dispatch(closeDetailViewFull());*/}
                            {/*                    dispatch(clearSelectInUserPets());*/}
                            {/*                }}>*/}
                            {/*                Delete*/}
                            {/*            </button>*/}
                            {/*        </>*/}
                            {/*    ) : (*/}
                            {/*        <></>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>

        </>

        // <div className="shared-pet-details">
        //     <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}}>
        //         <Typography gutterBottom variant="h4" component="div">
        //             {capitalizeEachWord(pet.petName)}
        //         </Typography>
        //         <Typography gutterBottom variant="h6" component="div">
        //             {capitalizeEachWord(pet.species)}
        //         </Typography>
        //         <CardMedia
        //             component="img"
        //             height="250"
        //             image={pet.picture}
        //             alt={pet.petName}
        //         />
        //         <Typography variant="body2" color="text.secondary">
        //             {capitalizeEachWord(pet.breed)},
        //             {pet.age >= 12
        //                 ? `${Math.floor(pet.age / 12)} Year ${pet.age % 12} Month`
        //                 : `${pet.age} Month`
        //             }
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //             Size: {capitalizeEachWord(pet.size)}
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //             Pet Personality: {pet.petPersonality ?
        //             pet.petPersonality.map(capitalizeEachWord).join(', ') : ''}
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //             {pet.houseTrained ?
        //                 'House-trained' : ''}
        //         </Typography>
        //
        //         <img src={pet.image} alt={pet.name}/>
        //         <p>{pet.description}</p>
        //     </Card>
        // </div>
    )
        ;
};

export default SharedPetDetails;
