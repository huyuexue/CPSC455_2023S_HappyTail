import {useDispatch, useSelector} from "react-redux";
import {
    Alert,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Snackbar,
    Typography
} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import PetDetail from "./PetDetail";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {updateFavoriteAsync} from "../../redux/userPets/thunks";
import {useNavigate} from "react-router-dom";
import {forwardRef, useState} from "react";
import * as PropTypes from "prop-types";

export default function PetCard({pet}) {
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const dispatch = useDispatch();

    const token = useSelector(state => state.login.token);
    const favoritePets = useSelector(state => state.user.favorite);
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const nav = useNavigate();
    const petId = pet._id;
    const isFavorite = favoritePets.includes(petId);
    const isOwner = idList.includes(petId);
    const [shareOpen, setShareOpen] = useState(false);


    const handleShareClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShareOpen(false);
    };


    const handleClick = async (selectedPet) => {
        try {
            nav(`/pets/${pet._id}`);
        } catch (error) {
            console.error("Error fetching pet details:", error);
        }
    };


    const handleFavoriteToggle = () => {
            if (token) {
                dispatch(updateFavoriteAsync({token, petId}));
            } else {
                const petId = pet._id;
                dispatch(getDetailAsync(petId));
                localStorage.setItem('prevURL', window.location.href);
                nav('/login')
            }
        }
    ;

    const handleShareButtonClick = () => {
        navigator.clipboard.writeText(`happytails.tech/pets/${pet._id}`);
        setShareOpen(true)
    };


    return (
        <>
            <Card className="pet-card" key={pet._id} sx={{maxWidth: 345, zIndex: -1}}>
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
                                ? `${Math.floor(pet.age / 12)} Year ${pet.age % 12} Month`
                                : `${pet.age} Month`
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleShareButtonClick} >
                        Share
                    </Button>

                    <Snackbar open={shareOpen} onClose={handleShareClose} autoHideDuration={6000}>
                        <Alert onClose={handleShareClose} severity="success" sx={{width: '100%'}}>
                            Link copied to clipboard!
                        </Alert>
                    </Snackbar>
                    {isOwner ?
                        (<></>) :
                        (<IconButton color={isFavorite ? 'secondary' : 'default'} aria-label="add to favorites"
                                     onClick={handleFavoriteToggle}>
                            {isFavorite ? <Favorite/> : <FavoriteBorder/>}
                        </IconButton>)
                    }
                </CardActions>
            </Card>
        </>
    )
}