import {useSelector, useDispatch} from "react-redux";
import {initialState} from "../pets/petsSlice";
import PetCard from "../pets/PetCard";
import {Grid, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {useState} from "react";
import PetsIcon from "@mui/icons-material/Pets";

export default function PetResults() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.list);

    const sortings = [
        {label: "Recommended", value: "Recommended", icon: <PetsIcon/>},
        {label: "Newest", value: "Newest", icon: <PetsIcon/>},
        {label: "Oldest", value: "Oldest", icon: <PetsIcon/>},
        {label: "Urgent", value: "Urgent", icon: <PetsIcon/>},
        {label: "Nearest", value: "Nearest", icon: <PetsIcon/>},
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
            {/*https://mui.com/material-ui/react-menu/#menulist-composition*/}
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {sortings.map((action) => (
                    <SpeedDialAction
                        key={action.value}
                        icon={action.icon}
                        tooltipTitle={action.label}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
            <Grid container spacing={3} sx={{
                padding: 2
            }}>
                {pets.map(pet => (<Grid item xs={4}>
                    <PetCard key={pet.id} pet={pet}></PetCard>
                </Grid>))}
            </Grid>
        </>
    );
}