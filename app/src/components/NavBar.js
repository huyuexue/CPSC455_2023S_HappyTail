import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./menu";
import {useSelector} from "react-redux";



export default function NavBar() {
    const buttonRoutes = {
        "Home": "/",
        "Browse": "/browse",
        "Add": "/addNewPet",
        "About": "/about",
    };

    const localStorageToken = localStorage.getItem('tokenId');
    const globalToken = useSelector(state => state.login.token);
    const token = localStorageToken || globalToken;
    const isLogin = (token === null) ? false : true;

    const rightButtonRoutes = {
        "Login": "/login",
    }
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Happy Tails
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="navigation menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {Object.entries(buttonRoutes).map(([name, route]) => (
                            <MenuItem key={name} onClick={handleCloseNavMenu}>
                                <Link to={route} style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">{name}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                        {Object.entries(rightButtonRoutes).map(([name, route]) => (
                            <MenuItem key={name} onClick={handleCloseNavMenu}>
                                <Link to={route} style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">{name}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Happy Tails
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {Object.entries(buttonRoutes).map(([name, route]) => (
                        <Link key={name} to={route} style={{ textDecoration: 'none' }}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {name}
                            </Button>
                        </Link>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    {isLogin? (
                        <>
                            <UserMenu />
                        </>
                    ) : (
                        <>
                            <Link to={"/login"} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    login
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
