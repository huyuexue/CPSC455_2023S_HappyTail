
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailView, closeDetailViewFull} from "../../redux/detail/reducer";
import {clearSelectInUserPets, getSelectedItem, } from "../../redux/userPets/reducer";
import {deletePetAsync, getUserPetsAsync,} from "../../redux/userPets/thunks";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Close, DeleteOutline, Edit} from "@mui/icons-material";
import {CardMedia, Tooltip} from "@mui/material";


export default function PetDetail() {
    const dispatch = useDispatch();
    const petInfo = useSelector(state => state.petDetail.selectItem);
    const token = useSelector(state => state.login.token);
    const isLogIn = useSelector(state => !state.login.value);
    const id = petInfo._id;
    const nav = useNavigate();
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const isOwner= idList.includes(id);

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
                        {isOwner ?
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
                        {isOwner ? (
                            <>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton
                                        onClick={() => {
                                            dispatch(getSelectedItem(petInfo));
                                            dispatch(closeDetailView());
                                            nav('/updatePet');
                                        }}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top">
                                    <IconButton
                                        onClick={() => {
                                            dispatch(deletePetAsync({id, token}));
                                            dispatch(closeDetailViewFull());
                                            dispatch(clearSelectInUserPets());
                                        }}>
                                        <DeleteOutline />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </>
        </aside>
    )
}