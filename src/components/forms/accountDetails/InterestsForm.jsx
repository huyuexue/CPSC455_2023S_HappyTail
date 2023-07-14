import {faCat, faDog, faFrog} from "@fortawesome/free-solid-svg-icons";
import InterestButton from "../../elements/InterestButton";
import {Grid} from "@mui/material";


export default function InterestsForm() {
    const buttons = [
        {icon: faCat, label: "Cats"},
        {icon: faDog, label: "Dogs"},
        {icon: faFrog, label: "Amphibians"}
    ]
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{
            padding: 2,
            height: 1
        }}>
            {buttons.map((button) =>
                <Grid item>
                    <InterestButton icon={button.icon} label={button.label}></InterestButton>
                </Grid>
            )}
        </Grid>
    )
}