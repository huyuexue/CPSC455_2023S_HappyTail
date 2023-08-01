import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailView, closeDetailViewFull} from "../../redux/detail/reducer";
import {clearSelectInUserPets, getSelectedItem, openUpdateView} from "../../redux/userPets/reducer";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {deletePetAsync, getUserPetsAsync} from "../../redux/userPets/thunks";
import {capitalizeEachWord} from "../../utils";
import Paper from "@mui/material/Paper";

export default function PetDetail({}) {
    const dispatch = useDispatch();
    const petInfo = useSelector(state => state.petDetail.selectItem);
    const token = useSelector(state => state.login.token);

    const id = petInfo._id;
    const nav = useNavigate();

    const [dashboard, setDashboard] = useState(false);
    useEffect(() => {
        if (window.location.hash == "#/dashboard") {
            setDashboard(true)
        }
    }, []);

    return (
        <aside className="popupWindow">
            <Paper>
                <div className="detail">
                    <img src={petInfo.picture} alt="Not available"/>
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
                        {dashboard ? (
                            <>
                                <button
                                    className="updateItemButton"
                                    onClick={() => {
                                        dispatch(getSelectedItem(petInfo));
                                        dispatch(closeDetailView());
                                        nav('/updatePet');
                                    }}>
                                    Edit
                                </button>
                                <button
                                    className="deleteItemButton"
                                    onClick={() => {
                                        dispatch(deletePetAsync({id, token}));
                                        dispatch(closeDetailViewFull());
                                        dispatch(clearSelectInUserPets());
                                    }}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                        <button
                            className="close"
                            onClick={() => {
                                dispatch(getUserPetsAsync({token}));
                                dispatch(closeDetailViewFull());
                                dispatch(clearSelectInUserPets());
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            </Paper>
        </aside>
    )
}