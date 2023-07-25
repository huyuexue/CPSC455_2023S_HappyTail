
import {useDispatch} from "react-redux";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {openDetailView} from "../../redux/detail/reducer";
import {getDetailAsync} from "../../redux/detail/thunks";
import PetDetail from "../petDetail/PetDetail";
import {useEffect, useState} from "react"; 
export default function PetCard({pet, setRefresh, token}) {
    const[openDetail, setOpenDetail]=useState(false)
    useEffect(()=>{
        setRefresh(true)
    },[openDetail])
    return (

        <>
        <Card className="pet-card" key={pet._id} sx={{maxWidth: 345}} onClick={() => {setOpenDetail(true)}}>
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
                        {pet.breed}, {pet.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
        {openDetail?(<PetDetail pet={pet}  setOpen={setOpenDetail} token={token}/>):(<></>)}
        </>
    )
}