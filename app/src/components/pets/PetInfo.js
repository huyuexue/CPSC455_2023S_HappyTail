import IconButton from "@mui/material/IconButton";
import {updateFavoriteAsync} from "../../redux/userPets/thunks";
import {Favorite, FavoriteBorder, MailOutline, Share} from "@mui/icons-material";
import {CardContent, CardMedia, Grid, Stack, Tooltip} from "@mui/material";
import {capitalizeEachWord} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import emailJs from "@emailjs/browser";
import {getDetailAsync} from "../../redux/detail/thunks";
import ShareButton from "../ShareButton";

export default function PetInfo() {
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetailAsync(id));
    },[]);

    const petInfo = useSelector(state => state.petDetail.selectItem);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const petId = petInfo._id;

    const isOwner= idList.includes(petId);
    const isLogIn = useSelector(state => !state.login.value);
    const token = useSelector(state => state.login.token);
    const favoritePets = useSelector(state => state.user.favorite);
    const isFavorite = favoritePets.includes(petId);

    const handleContactClicked = () => {
        if (isLogIn) {
            setShowMessageInput(true)
        } else {
            localStorage.setItem('prevURL', `/pets/${petId}`);
            nav('/login');
        }
    };

    const handleFavoriteToggle = () => {
        if (isLogIn) {
            dispatch(updateFavoriteAsync({token, petId}))
        } else {
            localStorage.setItem('prevURL', `/pets/${petId}`);
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
                <Grid container spacing={0} paddingTop={5} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={8} >
                        <h1 style={{ color: '#597133', fontSize: '50px' }}>{petInfo.petName}</h1>

                        <CardMedia
                            component="img"
                            height="400"
                            image={petInfo.picture}
                            alt="Not Available"
                            sx={{borderRadius: 10}}
                        />
                        <CardContent>
                            <Stack sx={{}}>
                                <h1><span>About</span></h1>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Breed</span> &nbsp; {capitalizeEachWord(petInfo.breed)}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Gender</span>&nbsp; {capitalizeEachWord(petInfo.gender)}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Age</span>&nbsp; {petInfo.age >= 12
                                    ? `${Math.floor(petInfo.age / 12)} Year ${petInfo.age % 12} Month`
                                    : `${petInfo.age} Month`
                                }</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Size</span>&nbsp; {capitalizeEachWord(petInfo.size)}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Spayed</span>&nbsp; {capitalizeEachWord(petInfo.spayed)}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>House Trained</span>&nbsp; {petInfo.houseTrained ? "Yes" : "No"}</p>
                                <div className="horizontalLine"></div>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Location</span>&nbsp; {petInfo.postCode}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Fur Type</span>&nbsp; {capitalizeEachWord(petInfo.furType)}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Pet Personality</span>&nbsp; {petInfo.petPersonality ?
                                    petInfo.petPersonality.map(capitalizeEachWord).join(', ') : ''}</p>
                                <p><span style={{fontWeight: 'bold', fontSize: '20px'}}>Description</span>&nbsp;{petInfo.description}</p>
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
                        <button onClick={() => {setCustomMessage(defaultMessage);setShowMessageInput(false)}}>Cancel</button>
                    </div>
                )}
            </>
    )
}