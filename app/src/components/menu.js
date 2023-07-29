import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from '@mui/material';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const nav = useNavigate();
    const auth = getAuth();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const signout = async () => {
        await auth.signOut()
        nav("/")
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                test
            </Avatar>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    nav("/dashboard");
                    setAnchorEl(null);
                }}>Dashboard</MenuItem>
                <MenuItem onClick={() => {
                    nav("/account/details");
                    setAnchorEl(null);
                }}>Account</MenuItem>
                <MenuItem onClick={() => signout()}>Logout</MenuItem>
            </Menu>
        </div>
    );
}