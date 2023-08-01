import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import PetDetail from "../petDetail/PetDetail";
import {capitalizeEachWord} from "../../utils";
import IconButton from "@mui/material/IconButton";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";

function AlarmIcon() {
    return null;
}

function FavoriteIcon() {
    return null;
}

export default function PetCard({pet, token}) {
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

    const [isFavorite, setIsFavorite] = useState(false);
    const handleFavoriteToggle = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    const [dashboard, setDashboard] = useState(false);
    useEffect(() => {
        if (window.location.hash == "#/dashboard") {
            setDashboard(true)
        }
    }, []);
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
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    {dashboard ? <></> : (
                        <IconButton color={isFavorite ? 'secondary' : 'default'} aria-label="add to favorites" onClick={handleFavoriteToggle}>
                            {isFavorite? <Favorite /> : <FavoriteBorder />}
                        </IconButton>)
                    }
                </CardActions>

            </Card>
            {detailViewIsOpen && (<PetDetail token={token}/>)}
        </>
    )
}