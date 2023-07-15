import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import ButtonBar from "../components/elements/buttons/ButtonBar";
import {updateStatus} from "../components/updatePet/updateFormSlice";
import UpdateForm from "../components/updatePet/UpdateFrom";
import {Grid, Paper, Stack} from "@mui/material";
import PetSearchForm from "../components/forms/PetSearchForm";
import Box from "@mui/material/Box";
import InterestButton from "../components/elements/InterestButton";
import React from "react";
import {faHouseChimney} from "@fortawesome/free-solid-svg-icons";
import {LargeIconButton} from "../components/elements/LargeIconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Home({itemsList}) {
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const updateIsOpen = useSelector(updateStatus)
    return (

        <div className="Home">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <PetsBrief/>
                </Grid>
                <Grid item xs={8}>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{paddingTop: 10}}>
                        <Stack spacing={2}>
                            {/*<PetSearchForm sx={{width: 100}}></PetSearchForm>*/}
                            <ButtonBar/>
                            <LargeIconButton sx={{
                                boxShadow: 3,
                                width: 666,
                            }}>
                                <Stack spacing={1}>
                                    <FontAwesomeIcon icon={faHouseChimney} size="5x"/>
                                    <h3>Find a Home</h3>
                                </Stack>
                            </LargeIconButton>
                        </Stack>
                    </Box>
                </Grid>


            </Grid>
            {detailViewIsOpen && <PetDetail/>}
            {updateIsOpen && <UpdateForm/>}
        </div>
    );
}