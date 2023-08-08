import {useDispatch, useSelector} from "react-redux";
import {Tooltip , Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Favorite, FavoriteBorder, Share} from "@mui/icons-material";
import {updateFavoriteAsync} from "../../redux/userPets/thunks";
import {useNavigate} from "react-router-dom";

export default function PetCard({pet}) {
    const dispatch = useDispatch();
    const dashboard = (window.location.hash === "#/dashboard");
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const petId = pet._id;
    const isOwner= idList.includes(petId);
    const handleClick = async () => {
        try {
            await dispatch(getDetailAsync(pet._id));
            if (dashboard && isOwner) {
                dispatch(openDetailView());
            } else {
                window.open(`#/pets/${pet._id}`);
            }
        } catch (error) {
            console.error("Error fetching pet details:", error);
        }
    };

    const token = useSelector(state => state.login.token);
    const favoritePets = useSelector(state => state.user.favorite);
    const nav = useNavigate();
    const isFavorite = favoritePets.includes(petId);


    const handleFavoriteToggle = () => {
        if (token) {
            dispatch(updateFavoriteAsync({token, petId}))
        } else{
            const petId = pet._id;
            dispatch(getDetailAsync(petId));
            localStorage.setItem('prevURL', window.location.href);
            nav('/login');
        }
    };

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

    return (
        <>
            <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}} >
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={pet.picture}
                        alt={pet.petName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {pet.petName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {capitalizeEachWord(pet.breed)},
                            {pet.age >= 12
                                ? `${Math.floor(pet.age/12)} Year ${pet.age % 12} Month`
                                : `${pet.age} Month`
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div className='btn-container'>
                    <CardActions>
                        <Tooltip title="Share" placement="top">
                            <IconButton onClick={handleShareClicked}>
                                <Share />
                            </IconButton>
                            </Tooltip>
                        {isOwner ?
                            (<></>) :
                            (<Tooltip title="Favorite" placement="top">
                                <IconButton color={isFavorite ? 'secondary' : 'default'} aria-label="add to favorites" onClick={handleFavoriteToggle}>
                                    {isFavorite? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </Tooltip>)
                        }

                    </CardActions>
                </div>
            </Card>
        </>
    )
}