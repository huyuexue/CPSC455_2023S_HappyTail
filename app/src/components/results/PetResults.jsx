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
export default function PetResults() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.list);

    const sortings = [
        {label: "Recommended", value: "Recommended", icon: <PetsIcon/>},
        {label: "Newest", value: "Newest", icon: <Update/>},
        {label: "Oldest", value: "Oldest", icon: <Restore/>},
        {label: "Urgent", value: "Urgent", icon: <PriorityHigh/>},
        {label: "Nearest", value: "Nearest", icon: <LocationOn/>},
    ];

    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getPetsAsync());
    }, [pets.length]); //TODO: need to fix this dispatch


    return (<>
            {/*https://mui.com/material-ui/react-menu/#menulist-composition*/}
            <SpeedDial
                ariaLabel="Sorting Options"
                sx={{position: 'absolute', bottom: 45, right: 45}}
                icon={
                    <Fab variant="extended" color="primary" aria-label="add" sx={{ minWidth: '130px', minHeight: '65px'}}>
                        <Sort sx={{ mr: 1 }} />
                        Sort by
                    </Fab>
                }
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
            {/* render pet card view*/}
            <Grid container spacing={3} sx={{
                padding: 2
            }}>
                {pets.map(pet => (<Grid item xs={4}>
                    <PetCard key={pet.id} pet={pet} setRefresh={setRefresh}></PetCard>
                </Grid>))}
            </Grid>
        </>
    );
}