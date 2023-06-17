import {useSelector, useDispatch} from "react-redux";
import {openDetailView, selectPet} from "../petDetail/petDetailSlice";
import {initialState} from "../pets/petsSlice";
import PetCard from "../pets/PetCard";
import {Grid} from "@mui/material";

export default function PetResults() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.list);

    return (
        <Grid container spacing={3} sx={{
            padding: 2
        }}>
            {pets.map(pet => (
                <Grid item xs={4}>
                    <PetCard key={pet.id} pet={pet}></PetCard>
                </Grid>
            ))}
        </Grid>
    );
}