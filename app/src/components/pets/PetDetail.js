import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailView, closeDetailViewFull} from "../../redux/detail/reducer";
import {clearSelectInUserPets, getSelectedItem, } from "../../redux/userPets/reducer";
import {deletePetAsync, getUserPetsAsync, updateFavoriteAsync} from "../../redux/userPets/thunks";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Close, DeleteOutline, Edit, Favorite, FavoriteBorder, MailOutline} from "@mui/icons-material";
import emailJs from "@emailjs/browser";
import {CardMedia} from "@mui/material";


export default function PetDetail() {
    const dispatch = useDispatch();
    const petInfo = useSelector(state => state.petDetail.selectItem);
    const token = useSelector(state => state.login.token);
    const isLogIn = useSelector(state => !state.login.value);

    const id = petInfo._id;
    const nav = useNavigate();

    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const petId = petInfo._id;
    const isOwner= idList.includes(petId);

    const favoritePets = useSelector(state => state.user.favorite);
    const isFavorite = favoritePets.includes(petId);

    const userInfo = useSelector(state => state.login.user);

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

    const dashboard = (window.location.hash === "#/dashboard");


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
        <aside className="popupWindow">
            <>
                <div className="detail">
                    <div className="closeButtonContainer">
                        <IconButton
                            onClick={() => {
                                if (isLogIn) {
                                    dispatch(getUserPetsAsync({token}));
                                    dispatch(clearSelectInUserPets());
                                }
                                dispatch(closeDetailViewFull());

                            }}
                        >
                            <Close />
                        </IconButton>
                    </div>
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
                    <>
                        {dashboard && isOwner ?
                            <>
                                <div className="horizontalLine"></div>
                                <p>Name: {capitalizeEachWord(petInfo.contactName)}</p>
                                <p>Email: {capitalizeEachWord(petInfo.contactEmail)}</p>
                                <p>Phone Number: {capitalizeEachWord(petInfo.contactNumber)}</p>
                            </>
                            :
                            <></>
                        }
                    </>

                    <div className='btn-container'>
                        {dashboard && isOwner ? (
                            <>
                                <IconButton
                                    onClick={() => {
                                        dispatch(getSelectedItem(petInfo));
                                        dispatch(closeDetailView());
                                        nav('/updatePet');
                                    }}>
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        dispatch(deletePetAsync({id, token}));
                                        dispatch(closeDetailViewFull());
                                        dispatch(clearSelectInUserPets());
                                    }}>
                                    <DeleteOutline />
                                </IconButton>
                            </>
                        ) : (
                            <></>
                        )}
                        {isOwner ?
                            <></> :
                            <>
                                <IconButton onClick={handleContactClicked}>
                                    <MailOutline />
                                </IconButton>
                                <IconButton color={isFavorite ? 'secondary' : 'default'} aria-label="add to favorites" onClick={handleFavoriteToggle}>
                                    {isFavorite? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
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
        </aside>
    )
}