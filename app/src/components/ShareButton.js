import {Share} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";

export default function ShareButton ({ petId, petName }) {
    const handleShareClicked = () => {
        const baseURL = `https://happytails-alpha.onrender.com/#`;
        const url = `${baseURL}/pets/${petId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                showCopyTooltip();
            })
            .catch((error) => {
                console.error("Error copying URL to clipboard:", error);
            });
    };

    const showCopyTooltip = () => {
        const tooltip = document.createElement('div');
        tooltip.textContent = `Link of ${petName} copied! Feel free to share it!`;
        tooltip.classList.add('copy-tooltip');
        document.body.appendChild(tooltip);
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    };

    return (
        <Tooltip title="Share" placement="top">
            <IconButton onClick={handleShareClicked}>
                <Share />
            </IconButton>
        </Tooltip>
    );
}
