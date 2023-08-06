import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import PetDetail from "./PetDetail";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {updateFavoriteAsync} from "../../redux/userPets/thunks";
import {useNavigate} from "react-router-dom";


export default function PetCard({pet}) {
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const dispatch = useDispatch();
    const handleClick = async (selectedPet) => {
        try {
            await dispatch(getDetailAsync(pet._id));
            dispatch(openDetailView());
        } catch (error) {
            console.error("Error fetching pet details:", error);
        }
    };

    const token = useSelector(state => state.login.token);
    const favoritePets = useSelector(state => state.user.favorite);
    const myPets = useSelector(state => state.user.list);
    const idList = (myPets.length !== 0) ? myPets.map(pet => pet._id) : [];
    const nav = useNavigate();
    const petId = pet._id;
    const isFavorite = favoritePets.includes(petId);
    const isOwner = idList.includes(petId);

    const handleFavoriteToggle = () => {
            if (token) {
                dispatch(updateFavoriteAsync({token, petId}))
            } else {
                const petId = pet._id;
                dispatch(getDetailAsync(petId));
                localStorage.setItem('prevURL', window.location.href);
                nav('/login')
            }
        }
    ;

    const handleShareButtonClick = () => {
        console.log('click')
        nav(`/pets/${pet._id}`);
      };
    

    return (
        <>
            <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}}>
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
                    <Button onClick={handleShareButtonClick}>
                        Share
                    </Button>
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