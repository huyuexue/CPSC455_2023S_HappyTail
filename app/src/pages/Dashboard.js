import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";

import UpdateForm from "../components/updatePet/UpdateForm";
import PetsList from "../components/pets/PetsList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";

export default function Dashboard({itemsList}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const updateIsOpen = useSelector(state => state.user.updateOpen);

    const nav = useNavigate();

    window.location.reload();

    return (
        <div className="Dashboard">
            <PetsList />
            {detailViewIsOpen && <PetDetail />}
            {updateIsOpen && <UpdateForm />}
        </div>
    );
}