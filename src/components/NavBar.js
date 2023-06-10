import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import {useState} from "react";
import {Link} from "react-router-dom";

export default function NavBar() {
    const buttonRoutes = {
        "Home": "/",
        "About": "/about",
        "Blog": "/blog"
    }
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        // <div className = "navBar">
        //     <ul className = "navLinks">
        //         <li><Link to="add">Add Item</Link></li>
        //         <li><Link to="/" id = "home">Home</Link></li>
        //         <li><Link to="about">About</Link></li>
        //         <li><Link to="Browse">Browse</Link></li>
        //     </ul>
        // </div>
        // based on https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
        <AppBar position="static">
            <Toolbar>
                <PetsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Happy Tails
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="navigation menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
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
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {Object.entries(buttonRoutes).map(([name, route]) => (
                            <Link to={route} style= { { textDecoration: 'none' }}>
                                <MenuItem key={name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Box>
                <PetsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Happy Tails
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {Object.entries(buttonRoutes).map(([name, route]) => (
                        <Link to={route} style= { { textDecoration: 'none' }}>
                            <Button
                                key={name}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {name}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}