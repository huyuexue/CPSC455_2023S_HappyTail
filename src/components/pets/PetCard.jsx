import {openDetailView, selectPet} from "../petDetail/petDetailSlice";
import {useDispatch} from "react-redux";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export default function PetCard(props) {
    const dispatch = useDispatch();

    return (
        // <div className="pet" key={props.pet.id}
        //      onClick={() => {
        //          dispatch(selectPet(props.pet));
        //          dispatch(openDetailView());
        //      }}>
        //     <div className="imageContainer">
        //         <img src={props.pet.pictureUrl} alt="Not available"/>
        //     </div>
        //     <h3>{props.pet.name}</h3>
        // </div>

        <Card className="pet-card" key={props.pet.id} sx={{maxWidth: 345}} onClick={() => {
            dispatch(selectPet(props.pet));
            dispatch(openDetailView());
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={props.pet.pictureUrl}
                    alt={props.pet.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.pet.breed}, {props.pet.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    )
}