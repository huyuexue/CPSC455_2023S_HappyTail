import {SelectPetProperties, SelectSortings} from "../components/results/ComponentsPopulation";
import {Grid, Paper} from "@mui/material";
import PetResults from "../components/results/PetResults";


export default function BrowsePage() {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Paper elevation={8} sx={{
                        borderRadius: 0,
                        padding: 2,
                        height: 1
                    }}>
                        <h2>Pet Filters</h2>
                        <SelectPetProperties></SelectPetProperties>
                    </Paper>

                </Grid>
                <Grid item xs={8}>
                    <PetResults></PetResults>
                </Grid>
            </Grid>
        </div>
    )
}