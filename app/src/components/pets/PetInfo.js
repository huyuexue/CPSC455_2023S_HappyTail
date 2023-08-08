import IconButton from "@mui/material/IconButton";
import {getFavoriteAsync, getUserPetsAsync, updateFavoriteAsync} from "../../redux/userPets/thunks";
import {closeDetailView, } from "../../redux/detail/reducer";
import {Favorite, FavoriteBorder, MailOutline, Share} from "@mui/icons-material";
import {CardMedia, Tooltip} from "@mui/material";
import {capitalizeEachWord} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import emailJs from "@emailjs/browser";
import {getPetsAsync} from "../../redux/pets/thunks";
import {getUserAsync} from "../../redux/login/thunks";
import {getDetailAsync} from "../../redux/detail/thunks";

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

    const handleShareClicked = () => {
        //TODO: add deployed FE base URL
        const baseURL = `http://localhost:3000/#`;
        const url = `${baseURL}/pets/${petId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log("URL copied to clipboard:", url);
            })
            .catch((error) => {
                console.error("Error copying URL to clipboard:", error);
            });
    };
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
                <div className="detail">
                    <CardMedia
                        component="img"
                        height="350"
                        image={petInfo.picture}
                        alt={petInfo.petName}
                    />
                    <h3>{petInfo.petName}</h3>
                    <p>Breed: {capitalizeEachWord(petInfo.breed)}</p>
                    <p>Gender: {capitalizeEachWord(petInfo.gender)}</p>
                    <p>Age: {petInfo.age >= 12
                        ? `${Math.floor(petInfo.age / 12)} Year ${petInfo.age % 12} Month`
                        : `${petInfo.age} Month`
                    }</p>
                    <p>Size: {capitalizeEachWord(petInfo.size)}</p>
                    <p>Spayed: {capitalizeEachWord(petInfo.spayed)}</p>
                    <p>House Trained: {petInfo.houseTrained ? "Yes" : "No"}</p>
                    <p>Location: {petInfo.postCode}</p>
                    <p>Fur Type: {capitalizeEachWord(petInfo.furType)}</p>
                    <p>Pet Personality: {petInfo.petPersonality ?
                        petInfo.petPersonality.map(capitalizeEachWord).join(', ') : ''}</p>
                    <p>Description:{petInfo.description}</p>

                    <div className='btn-container'>
                        {isOwner ?
                            <></> :
                            <>
                                <Tooltip title="Share" placement="top">
                                    <IconButton onClick={handleShareClicked}>
                                        <Share />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Contact" placement="top">
                                    <IconButton onClick={handleContactClicked}>
                                        <MailOutline />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Favorite" placement="top">
                                    <IconButton color={isFavorite ? 'secondary' : 'default'} aria-label="add to favorites" onClick={handleFavoriteToggle}>
                                        {isFavorite? <Favorite /> : <FavoriteBorder />}
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                    </div>
                </div>
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