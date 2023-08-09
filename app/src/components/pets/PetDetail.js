import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailView, closeDetailViewFull} from "../../redux/detail/reducer";
import {clearSelectInUserPets, getSelectedItem, openUpdateView} from "../../redux/userPets/reducer";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {deletePetAsync, getUserPetsAsync} from "../../redux/userPets/thunks";
import {capitalizeEachWord} from "../../utils";
import {Button, Card, CardContent, CardMedia, Fab, Grid, SpeedDial, SpeedDialAction, Stack} from "@mui/material";
import {FavoriteBorder, Share, Sort} from "@mui/icons-material";

export default function PetDetail({}) {
    const dispatch = useDispatch();
    const auth = getAuth();
    const [dashboard, setDashboard] = useState(false);
    const petInfo = useSelector(state => state.petDetail.selectItem);

    const id = petInfo._id;
    const nav = useNavigate();



    const [token, setToken] = useState("");

    const getToken = async (user) => {
        const token = await user.getIdToken()
        setToken(token)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getToken(user)
            } else {
                // alert("login please")
            }
        });
    }, []);

    useEffect(() => {
        console.log(window.location.hash)
        if (window.location.hash == "#/dashboard") {
            setDashboard(true)
        }
    }, []);

    return (
        <>

            <Grid container spacing={0} paddingTop={5} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card sx={{
                        borderRadius: 5,
                        padding: 5,
                        paddingBottom: 0,
                        maxHeight: "70vh",
                        overflow: 'auto'
                    }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={petInfo.picture}
                            alt="Not Available"
                            sx={{borderRadius: 3}}
                        />
                        <CardContent>
                            <Stack sx={{}}>
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
                                                    dispatch(openUpdateView());
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
                                    <Button
                                        className="close"
                                        onClick={() => {
                                            dispatch(getUserPetsAsync({token}));
                                            dispatch(closeDetailViewFull());
                                            dispatch(clearSelectInUserPets());
                                        }}>
                                        Close
                                    </Button>
                                </div>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>

    )
}