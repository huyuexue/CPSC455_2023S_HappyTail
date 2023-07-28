
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import PetDetail from "../petDetail/PetDetail";
import UpdateForm from "../updatePet/UpdateForm";
import {getSelectedItem} from "../../redux/userPets/reducer";
import {capitalizeEachWord} from "../../utils";
export default function PetCard({pet, token}) {
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const updateIsOpen = useSelector(state => state.user.updateOpen);
    const dispatch = useDispatch();

    const handleClick = async (selectedPet) => {
        try {
            await dispatch(getDetailAsync(pet._id));
            dispatch(openDetailView());
        } catch (error) {
            console.error("Error fetching pet details:", error);
        }
    };

    return (
        <>
            <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}} onClick={handleClick}>
                <CardActionArea>
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
{/*                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>*/}
            </Card>
            {detailViewIsOpen && (<PetDetail token={token}/>)}
            {updateIsOpen && <UpdateForm/>}
        </>
    )
}