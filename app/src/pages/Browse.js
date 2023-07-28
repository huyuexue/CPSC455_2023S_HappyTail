import {SelectPetProperties} from "../components/results/ComponentsPopulation";
import {Grid, Paper, useMediaQuery} from "@mui/material";
import PetResults from "../components/results/PetResults";
import {useTheme} from "@mui/material/styles";


export default function BrowsePage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const paperHeight = isSmallScreen ? '40vh' : '100vh';
    return (
        <Grid container spacing={0} justifyContent={isSmallScreen ? "center" : "flex-start"}>
            <Grid xs={12} sm={2}>
                <Paper elevation={8} sx={{
                    borderRadius: 0,
                    padding: 2,
                    height: paperHeight,
                }}>
                    {/* This is where the filter form constructed */}
                    <SelectPetProperties></SelectPetProperties>
                </Paper>

            </Grid>

            <Grid item xs={12} sm={8}>
                {/* This is where the results will be displayed */}
                <PetResults></PetResults>
            </Grid>
        </Grid>
    )
}