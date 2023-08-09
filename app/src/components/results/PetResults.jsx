import {useSelector, useDispatch} from "react-redux";
import PetCard from "../pets/PetCard";
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import {useEffect} from "react";
import {speciesItems} from "./options";
import {PetPropertySelections} from "./FilterSelection";
import * as React from "react";
import {updateSpecies} from "../../redux/pets/reducer";
import {useLocation} from "react-router-dom";

export default function PetResults() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.list);
    const petsResult = useSelector(state => state.pets.searchList)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSpecies = queryParams.get('type') || '';
    const [species, setSpecies] = React.useState(initialSpecies);

    const { isLoading } = useSelector(state => state.pets.isLoading);

    useEffect(() => {
        dispatch(updateSpecies(species));
    }, [dispatch, species,pets.length]);

    const handleSpeciesChange = (event) => {
        setSpecies(event);
        dispatch(updateSpecies(event));
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Box sx={{
                        width: "150px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                        marginBottom: "10px"
                    }}>
                        <PetPropertySelections
                            label="Species"
                            value={species}
                            items={speciesItems}
                            onChange={handleSpeciesChange}
                        />
                    </Box>
                    {/* render pet card view*/}
                    <Box sx={{maxHeight: "65vh"}}>
                        <Grid container spacing={3} sx={{padding: 2}} direction={{xs: 'column', md: 'row'}}>
                            {petsResult.map(pet => (<Grid item xs={4} key={`${pet._id}-${pet.species}`}>
                                <PetCard key={pet.id} pet={pet}></PetCard>
                            </Grid>))}
                        </Grid>
                    </Box>
                </>
            )}
        </>
    );
}