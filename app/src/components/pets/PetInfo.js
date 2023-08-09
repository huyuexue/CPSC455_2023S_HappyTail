import IconButton from "@mui/material/IconButton";
import {updateFavoriteAsync} from "../../redux/userPets/thunks";
import {closeDetailView,} from "../../redux/detail/reducer";
import {Favorite, FavoriteBorder, MailOutline, Share, Sort} from "@mui/icons-material";
import {CardContent, CardMedia, Fab, Grid, SpeedDial, SpeedDialAction, Stack, Tooltip} from "@mui/material";
import {capitalizeEachWord} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import emailJs from "@emailjs/browser";
import {getDetailAsync} from "../../redux/detail/thunks";
import ShareButton from "../ShareButton";

export default function PetInfo() {
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetailAsync(id));
    }, []);

    const petInfo = useSelector(state => state.petDetail.selectItem);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const petId = petInfo._id;

    const isOwner = idList.includes(petId);
    const isLogIn = useSelector(state => !state.login.value);
    const token = useSelector(state => state.login.token);
    const favoritePets = useSelector(state => state.user.favorite);
    const isFavorite = favoritePets.includes(petId);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const petActions = [
        {label: "Share", value: "Share", icon: <Share/>},
        {label: "Shortlist", value: "Shortlist", icon: <FavoriteBorder/>},
    ]

    const handleContactClicked = () => {
        if (isLogIn) {
            setShowMessageInput(true)
        } else {
            dispatch(closeDetailView());
            localStorage.setItem('prevURL', window.location.href);
            nav('/login');
        }
    };

    const handleFavoriteToggle = () => {
        if (isLogIn) {
            console.log("in PetDetail and is log in, token: " + token);
            dispatch(updateFavoriteAsync({token, petId}))
        } else {
            dispatch(closeDetailView());
            localStorage.setItem('prevURL', window.location.href);
            nav('/login');
        }
    };

    const userInfo = useSelector(state => state.login.user);
    const [showMessageInput, setShowMessageInput] = useState(false);
    const defaultMessage = 'I am interested, please contact me if it is still looking for a home.';
    const [customMessage, setCustomMessage] = useState(defaultMessage);
    const emailJsKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const handleSubmit = () => {
        const form = {
            pet_name: petInfo.petName,
            to_name: petInfo.contactName,
            from_name: capitalizeEachWord(userInfo.firstName),
            from_contact: userInfo.email,
            message: customMessage,
        }
        emailJs.send('service_w4ptg2k', petInfo.contactEmail, form, emailJsKey)
            .then(res => {
                return res;
            })
            .catch(error => {
                console.log("ERROR:" + JSON.stringify(error));
            });
        setCustomMessage(defaultMessage);
        setShowMessageInput(false);
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
                            <div className='btn-container'>
                                <ShareButton petId={petInfo._id} petName={petInfo.petName}/>
                                {isOwner ?
                                    <></> :
                                    <>
                                        <Tooltip title="Contact" placement="top">
                                            <IconButton onClick={handleContactClicked}>
                                                <MailOutline/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Favorite" placement="top">
                                            <IconButton color={isFavorite ? 'secondary' : 'default'}
                                                        aria-label="add to favorites" onClick={handleFavoriteToggle}>
                                                {isFavorite ? <Favorite/> : <FavoriteBorder/>}
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }
                            </div>

                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
            {showMessageInput && (
                <div className="messagePopup">
                        <textarea
                            placeholder="Enter your custom message..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                        />
                    <button onClick={handleSubmit}>Send Message</button>
                    <button onClick={() => {
                        setCustomMessage(defaultMessage);
                        setShowMessageInput(false)
                    }}>Cancel
                    </button>
                </div>
            )}

        </>
    )
}