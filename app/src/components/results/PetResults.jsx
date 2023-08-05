import {useSelector, useDispatch} from "react-redux";
import PetCard from "../pets/PetCard";
import {Grid, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {useState} from "react";
import PetsIcon from "@mui/icons-material/Pets";
import {LocationOn, PriorityHigh, Restore, Schedule, Sort, Update} from "@mui/icons-material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import {useEffect} from "react";
import {getPetsAsync} from "../../redux/pets/thunks";
import {speciesItems} from "../forms/options";
import {PetPropertySelections} from "./FilterSelection";
import * as React from "react";
import {updateSpecies} from "../../redux/pets/reducer";
import {useLocation} from "react-router-dom";

export default function PetResults() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.list);
    const petsResult = useSelector(state => state.pets.searchList)
    const isLoading = useSelector(state => state.pets.isLoading);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSpecies = queryParams.get('type') || '';
    const [species, setSpecies] = React.useState(initialSpecies);

    useEffect(() => {
        dispatch(getPetsAsync());
    }, []);

    useEffect(() => {
        dispatch(updateSpecies(species));
    }, [pets]);

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
                        marginBottom: "10px",
                    }}>
                        <PetPropertySelections
                            label="Species"
                            value={species}
                            items={speciesItems}
                            onChange={handleSpeciesChange}
                        />
                    </Box>
                    {/* render pet card view*/}
                    <Grid container spacing={3} sx={{
                        padding: 2,
                        // maxHeight: "90vh",
                        // overflow: 'auto'
                    }} direction={{xs: 'column', md: 'row'}}>
                        {petsResult.map(pet => (<Grid item xs={4} key={`${pet._id}-${pet.species}`}>
                            <PetCard key={pet.id} pet={pet}></PetCard>
                        </Grid>))}
                    </Grid>
                </>
            )}
        </>
    );
}