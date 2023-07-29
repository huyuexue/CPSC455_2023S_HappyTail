import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import ButtonBar from "../components/elements/buttons/ButtonBar";
import {Grid, Stack, useMediaQuery, Box} from "@mui/material";
import {updateStatus} from "../components/updatePet/updateFormSlice";
import UpdateForm from "../components/updatePet/UpdateFrom";
import {Grid, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {faHouseChimney} from "@fortawesome/free-solid-svg-icons";
import {LargeIconButton} from "../components/elements/LargeIconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export default function Home() {
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div className="Home">
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <PetsBrief/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{ paddingTop: 5 }}>
                        <Stack spacing={isSmallScreen ? 1 : 2} alignItems={isSmallScreen ? "center" : "flex-start"} justifyContent={isSmallScreen ? "center" : "flex-start"} direction={isSmallScreen ? "row" : "column"}>
                            <ButtonBar/>
                            <Link to="/addNewPet" style={{textDecoration: 'none'}}>
                                <LargeIconButton sx={{
                                    boxShadow: 3,
                                    width: isSmallScreen ? "100%" : 446,
                                    flexGrow: isSmallScreen ? 1 : 0,
                                    textAlign: isSmallScreen ? "center" : "left",
                                }}>
                                    <Stack spacing={1}>
                                        <FontAwesomeIcon icon={faHouseChimney} size={isSmallScreen ? "2x" : "5x"}/>
                                        <h3>Find a Home</h3>
                                    </Stack>
                                </LargeIconButton>
                            </Link>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            {detailViewIsOpen && <PetDetail/>}
        </div>
    );
}