import {LargeIconButton} from "./LargeIconButton";
import {Stack} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function InterestButton(props) {
    return (
        <LargeIconButton sx={{
            boxShadow: 3,
            backgroundColor: "#bc6c25"
        }}>
            <Stack spacing={1}>
                <FontAwesomeIcon icon={props.icon} size="5x"/>
                <h3>{props.label}</h3>
            </Stack>
        </LargeIconButton>
    )
}