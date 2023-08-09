import {Share} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Alert, Snackbar, Tooltip} from "@mui/material";
import {useState} from "react";

export default function ShareButton({petId, petName}) {
    const [shareOpen, setShareOpen] = useState(false);

    const handleShareButtonClick = () => {
        navigator.clipboard.writeText(`happytails.tech/pets/${petId}`);
        setShareOpen(true)
    };

    const handleShareClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShareOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleShareButtonClick}>
                <Share/>
            </IconButton>
            <Snackbar open={shareOpen} onClose={handleShareClose} autoHideDuration={6000}>
                <Alert onClose={handleShareClose} severity="success" sx={{width: '100%'}}>
                    Link to {petName} copied to clipboard!
                </Alert>
            </Snackbar>
        </>

    );
}
